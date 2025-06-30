
import React from 'react';
import { AlertTriangle, Package, TrendingDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const StockHealthWidget: React.FC = () => {
  // Mock stock data - in real app, this would come from props or context
  const stockSummary = {
    totalItems: 15,
    criticalItems: 2,
    lowStockItems: 4,
    healthyItems: 9
  };

  const criticalMaterials = ['Steel Rods (12mm)', 'River Sand'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Package className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Stock Health</h3>
        </div>
        <Link 
          to="/global-stock"
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
        >
          <span>View Global Stock</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{stockSummary.totalItems}</div>
          <div className="text-sm text-gray-600">Total Items</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{stockSummary.healthyItems}</div>
          <div className="text-sm text-gray-600">Healthy Stock</div>
        </div>
      </div>

      {/* Alerts */}
      <div className="space-y-3">
        {stockSummary.criticalItems > 0 && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm font-medium text-red-800">
                {stockSummary.criticalItems} Critical Items
              </div>
              <div className="text-xs text-red-600">
                {criticalMaterials.join(', ')}
              </div>
            </div>
          </div>
        )}

        {stockSummary.lowStockItems > 0 && (
          <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg">
            <TrendingDown className="h-4 w-4 text-orange-600 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm font-medium text-orange-800">
                {stockSummary.lowStockItems} Low Stock Items
              </div>
              <div className="text-xs text-orange-600">
                Reorder recommended
              </div>
            </div>
          </div>
        )}
      </div>

      {stockSummary.criticalItems === 0 && stockSummary.lowStockItems === 0 && (
        <div className="text-center py-4">
          <div className="text-green-600 mb-2">✓</div>
          <div className="text-sm text-green-800 font-medium">All stock levels healthy</div>
          <div className="text-xs text-green-600">No immediate action required</div>
        </div>
      )}
    </div>
  );
};

export default StockHealthWidget;
