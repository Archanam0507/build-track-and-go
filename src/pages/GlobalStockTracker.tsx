import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Plus, AlertTriangle, Package, TrendingDown, TrendingUp, 
  Edit2, Save, X, Upload, Download, Filter, Search,
  BarChart3, Calendar, FileText, Bell, Truck
} from 'lucide-react';
import { GlobalMaterial, MaterialTransaction, MaterialAlert } from '../types/globalStock';
import { mockProjects } from '../utils/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const GlobalStockTracker: React.FC = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'analytics' | 'upload'>('overview');
  const [editingMaterial, setEditingMaterial] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [alertFilter, setAlertFilter] = useState('All');

  // Mock global materials data
  const [globalMaterials, setGlobalMaterials] = useState<GlobalMaterial[]>([
    {
      id: 'GM001',
      material: 'Cement (OPC 53 Grade)',
      unit: 'bags',
      totalReceived: 2500,
      usedQuantity: 1850,
      available: 650,
      reorderThreshold: 500,
      maxCapacity: 5000,
      forecastedUsage: 300,
      lastUpdated: '2024-06-24',
      category: 'Basic Materials'
    },
    {
      id: 'GM002',
      material: 'Steel Rods (12mm)',
      unit: 'pieces',
      totalReceived: 800,
      usedQuantity: 720,
      available: 80,
      reorderThreshold: 200,
      maxCapacity: 1500,
      forecastedUsage: 150,
      lastUpdated: '2024-06-23',
      category: 'Steel & Metal'
    },
    {
      id: 'GM003',
      material: 'Red Clay Bricks',
      unit: 'pieces',
      totalReceived: 50000,
      usedQuantity: 38000,
      available: 12000,
      reorderThreshold: 10000,
      maxCapacity: 100000,
      forecastedUsage: 8000,
      lastUpdated: '2024-06-24',
      category: 'Basic Materials'
    },
    {
      id: 'GM004',
      material: 'River Sand',
      unit: 'cubic meters',
      totalReceived: 200,
      usedQuantity: 180,
      available: 20,
      reorderThreshold: 50,
      maxCapacity: 500,
      forecastedUsage: 40,
      lastUpdated: '2024-06-22',
      category: 'Basic Materials'
    }
  ]);

  // Mock transactions data
  const [transactions, setTransactions] = useState<MaterialTransaction[]>([
    {
      id: 'T001',
      materialId: 'GM001',
      type: 'DELIVERY',
      quantity: 500,
      date: '2024-06-20',
      issuedBy: 'Rajesh Kumar',
      notes: 'Fresh delivery from supplier'
    },
    {
      id: 'T002',
      materialId: 'GM001',
      type: 'USAGE',
      quantity: 200,
      projectId: 'P001',
      projectName: 'Luxury Villa - Banjara Hills',
      date: '2024-06-21',
      issuedBy: 'Site Manager',
      notes: 'Foundation work'
    },
    {
      id: 'T003',
      materialId: 'GM002',
      type: 'USAGE',
      quantity: 50,
      projectId: 'P002',
      projectName: 'Commercial Complex - Gachibowli',
      date: '2024-06-22',
      issuedBy: 'Priya Sharma',
      notes: 'Column reinforcement'
    }
  ]);

  const canEdit = userProfile?.role === 'site_manager';

  // Calculate alerts
  const alerts: MaterialAlert[] = globalMaterials
    .filter(material => {
      if (material.available <= material.reorderThreshold * 0.3) return true;
      if (material.available <= material.reorderThreshold) return true;
      return false;
    })
    .map(material => ({
      id: `A${material.id}`,
      materialId: material.id,
      material: material.material,
      alertType: material.available <= material.reorderThreshold * 0.3 ? 'CRITICAL' : 'LOW_STOCK',
      currentStock: material.available,
      threshold: material.reorderThreshold,
      message: material.available <= material.reorderThreshold * 0.3 
        ? `Critical: Only ${material.available} ${material.unit} remaining`
        : `Low stock: ${material.available} ${material.unit} below threshold`,
      createdAt: new Date().toISOString(),
      acknowledged: false
    }));

  // Filter materials
  const filteredMaterials = globalMaterials.filter(material => {
    const matchesSearch = material.material.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || material.category === categoryFilter;
    const materialAlert = alerts.find(alert => alert.materialId === material.id);
    const matchesAlert = alertFilter === 'All' || 
      (alertFilter === 'Critical' && materialAlert?.alertType === 'CRITICAL') ||
      (alertFilter === 'Low Stock' && materialAlert?.alertType === 'LOW_STOCK') ||
      (alertFilter === 'Healthy' && !materialAlert);
    
    return matchesSearch && matchesCategory && matchesAlert;
  });

  // Prepare chart data
  const chartData = filteredMaterials.map(material => ({
    name: material.material.split(' ')[0],
    received: material.totalReceived,
    used: material.usedQuantity,
    available: material.available,
    forecasted: material.forecastedUsage
  }));

  const handleAddTransaction = (materialId: string, type: 'DELIVERY' | 'USAGE', quantity: number, projectId?: string) => {
    const newTransaction: MaterialTransaction = {
      id: `T${Date.now()}`,
      materialId,
      type,
      quantity,
      projectId,
      projectName: projectId ? mockProjects.find(p => p.id === projectId)?.name : undefined,
      date: new Date().toISOString().split('T')[0],
      issuedBy: userProfile?.name || 'Unknown',
      notes: ''
    };

    setTransactions([newTransaction, ...transactions]);

    // Update material quantities
    setGlobalMaterials(materials => materials.map(material => {
      if (material.id === materialId) {
        if (type === 'DELIVERY') {
          return {
            ...material,
            totalReceived: material.totalReceived + quantity,
            available: material.available + quantity,
            lastUpdated: new Date().toISOString().split('T')[0]
          };
        } else {
          return {
            ...material,
            usedQuantity: material.usedQuantity + quantity,
            available: material.available - quantity,
            lastUpdated: new Date().toISOString().split('T')[0]
          };
        }
      }
      return material;
    }));
  };

  const categories = ['Basic Materials', 'Steel & Metal', 'Electrical', 'Plumbing', 'Finishing'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Global Material Tracker</h1>
          <p className="text-gray-600">Unified inventory management across all construction sites</p>
        </div>
        <div className="flex space-x-3">
          {canEdit && (
            <>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} />
                <span>Add Material</span>
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Upload size={20} />
                <span>Upload CSV</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Alerts Summary */}
      {alerts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alerts.filter(alert => alert.alertType === 'CRITICAL').length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <h3 className="text-sm font-medium text-red-800">Critical Stock Alert</h3>
              </div>
              <div className="mt-2">
                <p className="text-sm text-red-700">
                  {alerts.filter(alert => alert.alertType === 'CRITICAL').length} material(s) critically low
                </p>
              </div>
            </div>
          )}
          
          {alerts.filter(alert => alert.alertType === 'LOW_STOCK').length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <TrendingDown className="h-5 w-5 text-orange-600" />
                <h3 className="text-sm font-medium text-orange-800">Reorder Recommended</h3>
              </div>
              <div className="mt-2">
                <p className="text-sm text-orange-700">
                  {alerts.filter(alert => alert.alertType === 'LOW_STOCK').length} material(s) below threshold
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Materials</p>
              <p className="text-2xl font-bold text-gray-900">{globalMaterials.length}</p>
            </div>
            <Package className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
              <p className="text-2xl font-bold text-red-600">
                {alerts.filter(alert => alert.alertType === 'CRITICAL').length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-orange-600">
                {alerts.filter(alert => alert.alertType === 'LOW_STOCK').length}
              </p>
            </div>
            <TrendingDown className="h-8 w-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-green-600">₹45.2L</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'overview', label: 'Material Overview', icon: Package },
              { key: 'transactions', label: 'Transaction Log', icon: FileText },
              { key: 'analytics', label: 'Analytics', icon: BarChart3 },
              { key: 'upload', label: 'CSV Upload', icon: Upload }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search materials..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <select
                  value={alertFilter}
                  onChange={(e) => setAlertFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Status</option>
                  <option value="Critical">Critical</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Healthy">Healthy</option>
                </select>
              </div>

              {/* Materials Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Material
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Received
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Used Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Available
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Forecasted Usage
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Updated
                      </th>
                      {canEdit && (
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredMaterials.map((material) => {
                      const alert = alerts.find(a => a.materialId === material.id);
                      const getStatusColor = () => {
                        if (alert?.alertType === 'CRITICAL') return 'text-red-600 bg-red-50';
                        if (alert?.alertType === 'LOW_STOCK') return 'text-orange-600 bg-orange-50';
                        return 'text-green-600 bg-green-50';
                      };
                      
                      return (
                        <tr key={material.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{material.material}</div>
                            <div className="text-sm text-gray-500">{material.category}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {material.unit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {material.totalReceived.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {material.usedQuantity.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {material.available.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {material.forecastedUsage.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
                              {alert ? alert.alertType.replace('_', ' ') : 'Healthy'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(material.lastUpdated).toLocaleDateString('en-IN')}
                          </td>
                          {canEdit && (
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => {
                                    const quantity = prompt('Enter delivery quantity:');
                                    if (quantity) handleAddTransaction(material.id, 'DELIVERY', parseInt(quantity));
                                  }}
                                  className="text-green-600 hover:text-green-700"
                                  title="Add Delivery"
                                >
                                  <Truck size={16} />
                                </button>
                                <button
                                  onClick={() => {
                                    const quantity = prompt('Enter usage quantity:');
                                    if (quantity) handleAddTransaction(material.id, 'USAGE', parseInt(quantity));
                                  }}
                                  className="text-blue-600 hover:text-blue-700"
                                  title="Record Usage"
                                >
                                  <Package size={16} />
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Transaction Log</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Material
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Issued By
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction) => {
                      const material = globalMaterials.find(m => m.id === transaction.materialId);
                      return (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(transaction.date).toLocaleDateString('en-IN')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {material?.material}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              transaction.type === 'DELIVERY' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                            }`}>
                              {transaction.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {transaction.quantity} {material?.unit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {transaction.projectName || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {transaction.issuedBy}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Material Analytics</h3>
              
              {/* Bar Chart - Received vs Used vs Available */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-md font-medium text-gray-900 mb-4">Material Inventory Overview</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="received" fill="#3b82f6" name="Total Received" />
                    <Bar dataKey="used" fill="#ef4444" name="Used Quantity" />
                    <Bar dataKey="available" fill="#10b981" name="Available" />
                    <Bar dataKey="forecasted" fill="#f59e0b" name="Forecasted Usage" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Usage Efficiency */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredMaterials.map(material => {
                  const usagePercent = (material.usedQuantity / material.totalReceived) * 100;
                  return (
                    <div key={material.id} className="bg-white p-4 rounded-lg border">
                      <h5 className="font-medium text-gray-900">{material.material.split(' ')[0]}</h5>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Usage Efficiency</span>
                          <span>{usagePercent.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${Math.min(usagePercent, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">CSV Upload</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <h4 className="mt-2 text-lg font-medium text-gray-900">Upload Material Transactions</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Upload a CSV file with material deliveries and usage data
                </p>
                <div className="mt-6">
                  <input
                    type="file"
                    accept=".csv"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                <p className="mt-4 text-xs text-gray-500">
                  Required columns: Material, Type (DELIVERY/USAGE), Quantity, Date, Project Name (optional)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalStockTracker;
