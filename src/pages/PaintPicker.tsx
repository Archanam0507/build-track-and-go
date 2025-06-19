
import React, { useState } from 'react';
import { Palette, Upload, Sun, Moon, Download, Save } from 'lucide-react';

const PaintPicker: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [customColor, setCustomColor] = useState('#3B82F6');
  const [isDayMode, setIsDayMode] = useState(true);
  const [savedDesigns, setSavedDesigns] = useState<any[]>([]);

  // Predefined color palette
  const colorPalette = [
    { name: 'Sky Blue', hex: '#87CEEB', category: 'Blues' },
    { name: 'Ocean Blue', hex: '#006994', category: 'Blues' },
    { name: 'Mint Green', hex: '#98FB98', category: 'Greens' },
    { name: 'Forest Green', hex: '#228B22', category: 'Greens' },
    { name: 'Sunset Orange', hex: '#FF8C00', category: 'Oranges' },
    { name: 'Coral Pink', hex: '#FF7F50', category: 'Pinks' },
    { name: 'Lavender', hex: '#E6E6FA', category: 'Purples' },
    { name: 'Cream White', hex: '#F5F5DC', category: 'Neutrals' },
    { name: 'Warm Beige', hex: '#F5E6D3', category: 'Neutrals' },
    { name: 'Charcoal Gray', hex: '#36454F', category: 'Grays' },
    { name: 'Terracotta', hex: '#E2725B', category: 'Earthy' },
    { name: 'Mustard Yellow', hex: '#FFDB58', category: 'Yellows' }
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyPaintColor = () => {
    console.log('Applying paint color:', selectedColor);
    alert('Paint color applied! (This would use AI/ML for actual color application)');
  };

  const saveDesign = () => {
    const design = {
      id: Date.now(),
      photo: selectedPhoto,
      color: selectedColor,
      mode: isDayMode ? 'Day' : 'Night',
      timestamp: new Date().toISOString()
    };
    setSavedDesigns([...savedDesigns, design]);
    alert('Design saved successfully!');
  };

  const downloadDesign = () => {
    console.log('Downloading design...');
    alert('Download functionality will be implemented with image processing');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Paint Shade Picker & Virtual Paint View</h1>
          <p className="text-gray-600">Upload house photos and visualize different paint colors</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsDayMode(!isDayMode)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isDayMode 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            {isDayMode ? <Sun size={20} /> : <Moon size={20} />}
            <span>{isDayMode ? 'Day View' : 'Night View'}</span>
          </button>
        </div>
      </div>

      {/* Photo Upload Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload House Photo</h2>
        
        {!selectedPhoto ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              id="photo-upload"
            />
            <label htmlFor="photo-upload" className="cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Click to upload house photo
              </p>
              <p className="text-xs text-gray-500">
                JPG, PNG up to 10MB
              </p>
            </label>
          </div>
        ) : (
          <div className="relative">
            <img
              src={selectedPhoto}
              alt="House"
              className={`w-full max-h-96 object-contain rounded-lg ${
                !isDayMode ? 'filter brightness-75 contrast-125' : ''
              }`}
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={applyPaintColor}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
              >
                Apply Color
              </button>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Color Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Color Palette */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Color Palette</h2>
          
          <div className="grid grid-cols-4 gap-3 mb-6">
            {colorPalette.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(color.hex)}
                className={`w-12 h-12 rounded-lg border-2 transition-all ${
                  selectedColor === color.hex 
                    ? 'border-gray-900 scale-110' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>

          {/* Custom Color Picker */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Custom Color</h3>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={customColor}
                onChange={(e) => {
                  setCustomColor(e.target.value);
                  setSelectedColor(e.target.value);
                }}
                className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={customColor}
                onChange={(e) => {
                  setCustomColor(e.target.value);
                  setSelectedColor(e.target.value);
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="#000000"
              />
            </div>
          </div>
        </div>

        {/* Selected Color Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Selected Color</h2>
          
          <div className="space-y-4">
            <div
              className="w-full h-32 rounded-lg border border-gray-300"
              style={{ backgroundColor: selectedColor }}
            />
            
            <div className="space-y-2">
              <p className="text-sm"><strong>Hex Code:</strong> {selectedColor}</p>
              <p className="text-sm"><strong>RGB:</strong> {
                selectedColor.match(/\w\w/g)?.map(hex => parseInt(hex, 16)).join(', ')
              }</p>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={saveDesign}
                disabled={!selectedPhoto}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={20} />
                <span>Save Design</span>
              </button>
              <button
                onClick={downloadDesign}
                disabled={!selectedPhoto}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={20} />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Color Categories */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['Blues', 'Greens', 'Oranges', 'Pinks', 'Purples', 'Neutrals', 'Grays', 'Yellows', 'Earthy'].map((category) => (
            <button
              key={category}
              className="p-3 text-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Palette className="mx-auto h-6 w-6 text-gray-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">{category}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Saved Designs */}
      {savedDesigns.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Saved Designs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedDesigns.map((design) => (
              <div key={design.id} className="border border-gray-200 rounded-lg p-4">
                <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <img
                    src={design.photo}
                    alt="Saved design"
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: design.color }}
                    />
                    <span className="text-sm text-gray-600">{design.color}</span>
                  </div>
                  <span className="text-xs text-gray-500">{design.mode}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(design.timestamp).toLocaleDateString('en-IN')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaintPicker;
