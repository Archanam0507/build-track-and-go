import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Plus, AlertTriangle, Package, TrendingDown, TrendingUp, 
  Edit2, Save, X, Upload, Download, Filter, Search,
  BarChart3, Calendar, FileText, Bell, Truck, Eye
} from 'lucide-react';
import { GlobalMaterial, MaterialTransaction, MaterialAlert } from '../types/globalStock';
import { mockProjects } from '../utils/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const StockTracker: React.FC = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'materials' | 'transactions' | 'analytics' | 'upload'>('materials');
  const [editingMaterial, setEditingMaterial] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [alertFilter, setAlertFilter] = useState('All');
  const [transactionFilter, setTransactionFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');

  // Global materials data
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

  // Transactions data
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
    },
    {
      id: 'T004',
      materialId: 'GM004',
      type: 'USAGE',
      quantity: 25,
      projectId: 'P001',
      projectName: 'Luxury Villa - Banjara Hills',
      date: '2024-06-23',
      issuedBy: 'Amit Singh',
      notes: 'Concrete mixing'
    }
  ]);

  const [newMaterial, setNewMaterial] = useState({
    material: '',
    unit: '',
    totalReceived: 0,
    reorderThreshold: 0,
    maxCapacity: 0,
    category: 'Basic Materials' as const
  });

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

  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const material = globalMaterials.find(m => m.id === transaction.materialId);
    const matchesSearch = material?.material.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         transaction.projectName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = transactionFilter === 'All' || transaction.type === transactionFilter;
    const matchesDate = !dateFilter || transaction.date >= dateFilter;
    
    return matchesSearch && matchesType && matchesDate;
  });

  const handleAddTransaction = (materialId: string, type: 'DELIVERY' | 'USAGE', quantity: number, projectId?: string, notes?: string) => {
    const newTransaction: MaterialTransaction = {
      id: `T${Date.now()}`,
      materialId,
      type,
      quantity,
      projectId,
      projectName: projectId ? mockProjects.find(p => p.id === projectId)?.name : undefined,
      date: new Date().toISOString().split('T')[0],
      issuedBy: userProfile?.name || 'Unknown',
      notes: notes || ''
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

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    const newGlobalMaterial: GlobalMaterial = {
      id: `GM${Date.now()}`,
      ...newMaterial,
      usedQuantity: 0,
      available: newMaterial.totalReceived,
      forecastedUsage: 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setGlobalMaterials([...globalMaterials, newGlobalMaterial]);
    setNewMaterial({
      material: '',
      unit: '',
      totalReceived: 0,
      reorderThreshold: 0,
      maxCapacity: 0,
      category: 'Basic Materials'
    });
    setShowAddForm(false);
  };

  const getStatusColor = (material: GlobalMaterial) => {
    const alert = alerts.find(a => a.materialId === material.id);
    if (alert?.alertType === 'CRITICAL') return 'text-red-600 bg-red-50';
    if (alert?.alertType === 'LOW_STOCK') return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  };

  const getStatusLabel = (material: GlobalMaterial) => {
    const alert = alerts.find(a => a.materialId === material.id);
    if (alert?.alertType === 'CRITICAL') return 'Critical';
    if (alert?.alertType === 'LOW_STOCK') return 'Low Stock';
    return 'OK';
  };

  const categories = ['Basic Materials', 'Steel & Metal', 'Electrical', 'Plumbing', 'Finishing'];
  const units = ['bags', 'pieces', 'cubic meters', 'square meters', 'tons', 'liters', 'kg'];

  // Chart data
  const chartData = filteredMaterials.map(material => ({
    name: material.material.split(' ')[0],
    received: material.totalReceived,
    used: material.usedQuantity,
    available: material.available,
    forecasted: material.forecastedUsage
  }));

  // Statistics
  const criticalCount = alerts.filter(alert => alert.alertType === 'CRITICAL').length;
  const lowStockCount = alerts.filter(alert => alert.alertType === 'LOW_STOCK').length;
  const healthyCount = globalMaterials.length - criticalCount - lowStockCount;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Global Stock Tracker</h1>
          <p className="text-gray-600">Unified material inventory across all construction sites</p>
        </div>
        <div className="flex space-x-3">
          {canEdit && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              <span>Add Material</span>
            </button>
          )}
        </div>
      </div>

      {/* Alerts Summary */}
      {alerts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {criticalCount > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <h3 className="text-sm font-medium text-red-800">Critical Stock Alert</h3>
              </div>
              <div className="mt-2">
                <p className="text-sm text-red-700">
                  {criticalCount} material(s) critically low - immediate reorder needed
                </p>
              </div>
            </div>
          )}
          
          {lowStockCount > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <TrendingDown className="h-5 w-5 text-orange-600" />
                <h3 className="text-sm font-medium text-orange-800">Reorder Recommended</h3>
              </div>
              <div className="mt-2">
                <p className="text-sm text-orange-700">
                  {lowStockCount} material(s) below reorder threshold
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
              <p className="text-sm font-medium text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-orange-600">{lowStockCount}</p>
            </div>
            <TrendingDown className="h-8 w-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Healthy</p>
              <p className="text-2xl font-bold text-green-600">{healthyCount}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Add Material Form */}
      {showAddForm && canEdit && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Add New Material</h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleAddMaterial} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Material Name *
              </label>
              <input
                type="text"
                value={newMaterial.material}
                onChange={(e) => setNewMaterial({...newMaterial, material: e.target.value})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit *
              </label>
              <select
                value={newMaterial.unit}
                onChange={(e) => setNewMaterial({...newMaterial, unit: e.target.value})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select unit</option>
                {units.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Initial Stock *
              </label>
              <input
                type="number"
                min="0"
                value={newMaterial.totalReceived}
                onChange={(e) => setNewMaterial({...newMaterial, totalReceived: parseFloat(e.target.value)})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                value={newMaterial.category}
                onChange={(e) => setNewMaterial({...newMaterial, category: e.target.value as any})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reorder Threshold *
              </label>
              <input
                type="number"
                min="0"
                value={newMaterial.reorderThreshold}
                onChange={(e) => setNewMaterial({...newMaterial, reorderThreshold: parseFloat(e.target.value)})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Capacity *
              </label>
              <input
                type="number"
                min="0"
                value={newMaterial.maxCapacity}
                onChange={(e) => setNewMaterial({...newMaterial, maxCapacity: parseFloat(e.target.value)})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2 flex justify-end space-x-3">
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
                Add Material
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'materials', label: 'Materials', icon: Package },
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
          {activeTab === 'materials' && (
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
                        Total Received
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Used
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Available
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Used In Sites
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reorder Threshold
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
                      const usedSites = [...new Set(
                        transactions
                          .filter(t => t.materialId === material.id && t.type === 'USAGE' && t.projectName)
                          .map(t => t.projectName)
                      )];
                      
                      return (
                        <tr key={material.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{material.material}</div>
                            <div className="text-sm text-gray-500">{material.unit}</div>
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
                            <div className="max-w-xs truncate" title={usedSites.join(', ')}>
                              {usedSites.length > 0 ? usedSites.join(', ') : 'None'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {material.reorderThreshold.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(material)}`}>
                              {getStatusLabel(material)}
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
                                    const project = prompt('Enter project name (optional):');
                                    if (quantity) handleAddTransaction(material.id, 'USAGE', parseInt(quantity), undefined, project || undefined);
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
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Live Transaction Log</h3>
                <div className="flex space-x-4">
                  <select
                    value={transactionFilter}
                    onChange={(e) => setTransactionFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="All">All Types</option>
                    <option value="DELIVERY">Deliveries</option>
                    <option value="USAGE">Usage</option>
                  </select>
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
              
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
                        Project
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Updated By
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTransactions.map((transaction) => {
                      const material = globalMaterials.find(m => m.id === transaction.materialId);
                      return (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(transaction.date).toLocaleDateString('en-IN')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {material?.material}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {transaction.projectName || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {transaction.quantity} {material?.unit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              transaction.type === 'DELIVERY' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                            }`}>
                              {transaction.type === 'DELIVERY' ? 'Received' : 'Issued'}
                            </span>
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
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredMaterials.map(material => {
                  const usagePercent = (material.usedQuantity / material.totalReceived) * 100;
                  const daysLeft = material.forecastedUsage > 0 ? Math.floor(material.available / (material.forecastedUsage / 30)) : 0;
                  return (
                    <div key={material.id} className="bg-white p-4 rounded-lg border">
                      <h5 className="font-medium text-gray-900">{material.material.split(' ')[0]}</h5>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Usage Efficiency</span>
                          <span>{usagePercent.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${Math.min(usagePercent, 100)}%` }}
                          ></div>
                        </div>
                        {daysLeft > 0 && (
                          <div className="text-xs text-gray-500">
                            ~{daysLeft} days left at current usage
                          </div>
                        )}
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

export default StockTracker;
