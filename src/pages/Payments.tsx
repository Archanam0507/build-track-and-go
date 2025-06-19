
import React, { useState } from 'react';
import { Plus, CreditCard, Clock, CheckCircle, XCircle, Upload, IndianRupee } from 'lucide-react';
import { mockProjects } from '../utils/mockData';

const Payments: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(mockProjects[0].id);
  const [formData, setFormData] = useState({
    type: 'Labour',
    amount: '',
    description: '',
    dueDate: '',
    bankDetails: '',
    upiId: ''
  });

  // Mock payment data
  const payments = [
    {
      id: 'PAY001',
      projectId: 'P001',
      type: 'Labour',
      amount: 250000,
      description: 'Monthly wages for construction workers',
      status: 'Pending',
      dueDate: '2024-06-25',
      bankDetails: 'HDFC Bank - 1234567890',
      requestedBy: 'Site Manager',
      createdAt: '2024-06-15'
    },
    {
      id: 'PAY002',
      projectId: 'P001',
      type: 'Materials',
      amount: 150000,
      description: 'Cement and steel purchase',
      status: 'Approved',
      dueDate: '2024-06-20',
      upiId: 'supplier@paytm',
      requestedBy: 'Contractor',
      createdAt: '2024-06-10',
      approvedBy: 'Owner'
    },
    {
      id: 'PAY003',
      projectId: 'P002',
      type: 'Advance',
      amount: 500000,
      description: 'Advance payment for next phase',
      status: 'Paid',
      dueDate: '2024-06-15',
      bankDetails: 'SBI Bank - 9876543210',
      requestedBy: 'Contractor',
      createdAt: '2024-06-05',
      proofUrl: '#'
    },
    {
      id: 'PAY004',
      projectId: 'P003',
      type: 'Machinery',
      amount: 75000,
      description: 'Crane rental for lifting materials',
      status: 'Rejected',
      dueDate: '2024-06-18',
      upiId: 'crane@gpay',
      requestedBy: 'Site Manager',
      createdAt: '2024-06-12'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Clock size={16} />;
      case 'Approved': return <CheckCircle size={16} />;
      case 'Paid': return <CheckCircle size={16} />;
      case 'Rejected': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPayment = {
      ...formData,
      id: `PAY${Date.now()}`,
      projectId: selectedProject,
      amount: parseFloat(formData.amount),
      status: 'Pending',
      requestedBy: 'Current User',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    console.log('Payment request created:', newPayment);
    alert('Payment request submitted successfully!');
    
    setFormData({
      type: 'Labour',
      amount: '',
      description: '',
      dueDate: '',
      bankDetails: '',
      upiId: ''
    });
    setShowAddForm(false);
  };

  // Calculate statistics
  const totalPending = payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);
  const totalApproved = payments.filter(p => p.status === 'Approved').reduce((sum, p) => sum + p.amount, 0);
  const totalPaid = payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-600">Raise payment requests and track their status</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Raise Payment Due</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{formatCurrency(totalPending)}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalApproved)}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Paid</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
            </div>
            <CreditCard className="h-8 w-8 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Add Payment Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Raise Payment Due</h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project *
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {mockProjects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Labour">Labour</option>
                  <option value="Advance">Advance</option>
                  <option value="Machinery">Machinery</option>
                  <option value="Materials">Materials</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <IndianRupee size={16} className="inline mr-1" />
                  Amount (₹) *
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date *
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the payment purpose"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Details
                </label>
                <input
                  type="text"
                  name="bankDetails"
                  value={formData.bankDetails}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Bank Name - Account Number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  UPI ID
                </label>
                <input
                  type="text"
                  name="upiId"
                  value={formData.upiId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your-upi@provider"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Payments List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Payment Requests</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {payments.map((payment) => (
            <div key={payment.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{payment.description}</h3>
                    <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {getStatusIcon(payment.status)}
                      <span>{payment.status}</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <p className="font-medium">Amount</p>
                      <p className="text-lg font-semibold text-gray-900">{formatCurrency(payment.amount)}</p>
                    </div>
                    <div>
                      <p className="font-medium">Type</p>
                      <p>{payment.type}</p>
                    </div>
                    <div>
                      <p className="font-medium">Due Date</p>
                      <p>{new Date(payment.dueDate).toLocaleDateString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="font-medium">Requested By</p>
                      <p>{payment.requestedBy}</p>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <p><strong>Payment Details:</strong> {payment.bankDetails || payment.upiId}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {payment.status === 'Paid' && payment.proofUrl && (
                    <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                      <Upload size={16} />
                      <span>View Proof</span>
                    </button>
                  )}
                  {payment.status === 'Pending' && (
                    <button
                      onClick={() => console.log('Approve payment:', payment.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payments;
