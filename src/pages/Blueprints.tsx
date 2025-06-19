
import React, { useState } from 'react';
import { Upload, FileText, Eye, Download, RotateCw, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { mockProjects } from '../utils/mockData';

const Blueprints: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(mockProjects[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedBlueprint, setSelectedBlueprint] = useState<any>(null);

  const categories = ['All', 'Elevation', 'Structure', 'Electrical', 'Plumbing', 'Paint'];

  // Mock blueprint data
  const blueprints = [
    {
      id: 'BP001',
      name: 'Front Elevation Plan',
      category: 'Elevation',
      fileUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600',
      uploadDate: '2024-06-10',
      version: 2
    },
    {
      id: 'BP002',
      name: 'Ground Floor Structure',
      category: 'Structure',
      fileUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600',
      uploadDate: '2024-06-12',
      version: 1
    },
    {
      id: 'BP003',
      name: 'Electrical Layout',
      category: 'Electrical',
      fileUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600',
      uploadDate: '2024-06-14',
      version: 3
    },
    {
      id: 'BP004',
      name: 'Plumbing Schematic',
      category: 'Plumbing',
      fileUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600',
      uploadDate: '2024-06-15',
      version: 1
    }
  ];

  const filteredBlueprints = selectedCategory === 'All' 
    ? blueprints 
    : blueprints.filter(bp => bp.category === selectedCategory);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Blueprint uploaded:', file.name);
      alert('Blueprint uploaded successfully!');
    }
  };

  const openViewer = (blueprint: any) => {
    setSelectedBlueprint(blueprint);
    setViewerOpen(true);
  };

  const BlueprintViewer = () => {
    if (!viewerOpen || !selectedBlueprint) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-6xl w-full h-5/6 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold">{selectedBlueprint.name}</h3>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded">
                <ZoomOut size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <ZoomIn size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <RotateCw size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <Maximize2 size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <Download size={20} />
              </button>
              <button 
                onClick={() => setViewerOpen(false)}
                className="p-2 hover:bg-gray-100 rounded text-red-600"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="flex-1 p-4 bg-gray-50 flex items-center justify-center">
            <img
              src={selectedBlueprint.fileUrl}
              alt={selectedBlueprint.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blueprint Management</h1>
          <p className="text-gray-600">Upload, view, and manage project blueprints</p>
        </div>
        <div>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="hidden"
            id="blueprint-upload"
          />
          <label
            htmlFor="blueprint-upload"
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <Upload size={20} />
            <span>Upload Blueprint</span>
          </label>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Blueprint Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlueprints.map((blueprint) => (
          <div key={blueprint.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-video bg-gray-100 relative">
              <img
                src={blueprint.fileUrl}
                alt={blueprint.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100">
                <button
                  onClick={() => openViewer(blueprint)}
                  className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  <Eye size={16} className="inline mr-2" />
                  View
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{blueprint.name}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  v{blueprint.version}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{blueprint.category}</p>
              <p className="text-xs text-gray-500">
                Uploaded: {new Date(blueprint.uploadDate).toLocaleDateString('en-IN')}
              </p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => openViewer(blueprint)}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <Eye size={16} />
                  <span>View</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 text-sm">
                  <Download size={16} />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBlueprints.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No blueprints found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Upload your first blueprint to get started.
          </p>
        </div>
      )}

      <BlueprintViewer />
    </div>
  );
};

export default Blueprints;
