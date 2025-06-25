
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Plus, AlertTriangle, Package, TrendingDown, TrendingUp, Edit2, Save, X } from 'lucide-react';
import { mockProjects } from '../utils/mockData';

interface StockItem {
  id: string;
  material: string;
  currentStock: number;
  unit: string;
  minThreshold: number;
  maxCapacity: number;
  lastUpdated: string;
  updatedBy: string;
  category: 'Basic Materials' | 'Steel & Metal' | 'Electrical' | 'Plumbing' | 'Finishing';
  projectId: string;
}

const StockTracker: React.FC = () => {
  const { user } = useAuth();
  const [selectedProject, setSelectedProject] = useState(mockProjects[0].id);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [stockItems, setStockItems] = useState<StockItem[]>([
    {
      id: 'ST001',
      material: 'Cement (OPC 53 Grade)',
      currentStock: 45,
      unit: 'bags',
      minThreshold: 20,
      maxCapacity: 200,
      lastUpdated: '2024-06-24',
      updatedBy: 'Rajesh Kumar',
      category: 'Basic Materials',
      projectId: mockProjects[0].id
    },
    {
      id: 'ST002',
      material: 'Steel Rods (12mm)',
      currentStock: 8,
      unit: 'pieces',
      minThreshold: 15,
      maxCapacity: 100,
      lastUpdated: '2024-06-23',
      updatedBy: 'Priya Sharma',
      category: 'Steel & Metal',
      projectId: mockProjects[0].id
    },
    {
      id: 'ST003',
      material: 'Red Clay Bricks',
      currentStock: 2500,
      unit: 'pieces',
      minThreshold: 1000,
      maxCapacity: 10000,
      lastUpdated: '2024-06-24',
      updatedBy: 'Amit Singh',
      category: 'Basic Materials',
      projectId: mockProjects[0].id
    },
    {
      id: 'ST004',
      material: 'River Sand',
      currentStock: 5,
      unit: 'cubic meters',
      minThreshold: 10,
      maxCapacity: 50,
      lastUpdated: '2024-06-22',
      updatedBy: 'Rajesh Kumar',
      category: 'Basic Materials',
      projectId: mockProjects[0].id
    }
  ]);

  const [newItem, setNewItem] = useState({
    material: '',
    currentStock: 0,
    unit: '',
    minThreshold: 0,
    maxCapacity: 0,
    category: 'Basic Materials' as const
  });

  const canEdit = user?.role === 'Contractor' || user?.role === 'Site Manager';
  const filteredItems = stockItems.filter(item => item.projectId === selectedProject);
  const lowStockItems = filteredItems.filter(item => item.currentStock <= item.minThreshold);
  const criticalItems = filteredItems.filter(item => item.currentStock <= item.minThreshold * 0.5);

  const getStockStatus = (item: StockItem) => {
    if (item.currentStock <= item.minThreshold * 0.5) return 'critical';
    if (item.currentStock <= item.minThreshold) return 'low';
    if (item.currentStock >= item.maxCapacity * 0.8) return 'high';
    return 'normal';
  };

  const getStockColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'low': return 'text-orange-600 bg-orange-50';
      case 'high': return 'text-green-600 bg-green-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const handleUpdateStock = (itemId: string, newStock: number) => {
    setStockItems(items => items.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            currentStock: newStock, 
            lastUpdated: new Date().toISOString().split('T')[0],
            updatedBy: user?.name || 'Unknown'
          }
        : item
    ));
    setEditingItem(null);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const newStockItem: StockItem = {
      id: `ST${Date.now()}`,
      ...newItem,
      projectId: selectedProject,
      lastUpdated: new Date().toISOString().split('T')[0],
      updatedBy: user?.name || 'Unknown'
    };
    setStockItems([...stockItems, newStockItem]);
    setNewItem({
      material: '',
      currentStock: 0,
      unit: '',
      minThreshold: 0,
      maxCapacity: 0,
      category: 'Basic Materials'
    });
    setShowAddForm(false);
  };

  const categories = ['Basic Materials', 'Steel & Metal', 'Electrical', 'Plumbing', 'Finishing'];
  const units = ['bags', 'pieces', 'cubic meters', 'square meters', 'tons', 'liters', 'kg'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Raw Materials Stock Tracker</h1>
          <p className="text-gray-600">Monitor and manage material inventory levels</p>
        </div>
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

      {/* Alert Cards */}
      {(criticalItems.length > 0 || lowStockItems.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {criticalItems.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <h3 className="text-sm font-medium text-red-800">Critical Stock Alert</h3>
              </div>
              <div className="mt-2">
                <p className="text-sm text-red-700">
                  {criticalItems.length} item(s) critically low: {criticalItems.map(item => item.material).join(', ')}
                </p>
              </div>
            </div>
          )}
          
          {lowStockItems.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <TrendingDown className="h-5 w-5 text-orange-600" />
                <h3 className="text-sm font-medium text-orange-800">Low Stock Warning</h3>
              </div>
              <div className="mt-2">
                <p className="text-sm text-orange-700">
                  {lowStockItems.length} item(s) below minimum threshold
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
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{filteredItems.length}</p>
            </div>
            <Package className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Items</p>
              <p className="text-2xl font-bold text-red-600">{criticalItems.length}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-orange-600">{lowStockItems.length}</p>
            </div>
            <TrendingDown className="h-8 w-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Healthy Stock</p>
              <p className="text-2xl font-bold text-green-600">
                {filteredItems.filter(item => getStockStatus(item) === 'normal').length}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Project Selection */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Project
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
      </div>

      {/* Add Item Form */}
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
          
          <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Material Name *
              </label>
              <input
                type="text"
                value={newItem.material}
                onChange={(e) => setNewItem({...newItem, material: e.target.value})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({...newItem, category: e.target.value as any})}
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
                Current Stock *
              </label>
              <input
                type="number"
                min="0"
                value={newItem.currentStock}
                onChange={(e) => setNewItem({...newItem, currentStock: parseFloat(e.target.value)})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit *
              </label>
              <select
                value={newItem.unit}
                onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
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
                Minimum Threshold *
              </label>
              <input
                type="number"
                min="0"
                value={newItem.minThreshold}
                onChange={(e) => setNewItem({...newItem, minThreshold: parseFloat(e.target.value)})}
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
                value={newItem.maxCapacity}
                onChange={(e) => setNewItem({...newItem, maxCapacity: parseFloat(e.target.value)})}
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

      {/* Stock Items by Category */}
      {categories.map(category => {
        const categoryItems = filteredItems.filter(item => item.category === category);
        if (categoryItems.length === 0) return null;

        return (
          <div key={category} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">{category}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Material
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Min/Max
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
                  {categoryItems.map((item) => {
                    const status = getStockStatus(item);
                    const isEditing = editingItem === item.id;
                    
                    return (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{item.material}</div>
                          <div className="text-sm text-gray-500">{item.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {isEditing ? (
                            <div className="flex items-center space-x-2">
                              <input
                                type="number"
                                defaultValue={item.currentStock}
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleUpdateStock(item.id, parseFloat((e.target as HTMLInputElement).value));
                                  }
                                }}
                              />
                              <span className="text-sm text-gray-500">{item.unit}</span>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-900">
                              {item.currentStock} {item.unit}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStockColor(status)}`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.minThreshold} / {item.maxCapacity} {item.unit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(item.lastUpdated).toLocaleDateString('en-IN')}
                          </div>
                          <div className="text-sm text-gray-500">by {item.updatedBy}</div>
                        </td>
                        {canEdit && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            {isEditing ? (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => {
                                    const input = document.querySelector(`input[defaultValue="${item.currentStock}"]`) as HTMLInputElement;
                                    if (input) {
                                      handleUpdateStock(item.id, parseFloat(input.value));
                                    }
                                  }}
                                  className="text-green-600 hover:text-green-700"
                                >
                                  <Save size={16} />
                                </button>
                                <button
                                  onClick={() => setEditingItem(null)}
                                  className="text-gray-600 hover:text-gray-700"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setEditingItem(item.id)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Edit2 size={16} />
                              </button>
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No materials found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding your first material to track.
          </p>
        </div>
      )}
    </div>
  );
};

export default StockTracker;
