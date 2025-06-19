
import React, { useState } from 'react';
import { Camera, Upload, MessageSquare, Tag, Calendar, Plus } from 'lucide-react';
import { mockProjects } from '../utils/mockData';

const DailyUpdates: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(mockProjects[0].id);
  const [photos, setPhotos] = useState<File[]>([]);
  const [captions, setCaptions] = useState<string[]>([]);
  const [category, setCategory] = useState('General');
  const [comments, setComments] = useState('');

  const categories = [
    'General', 'Foundation', 'Framing', 'Roofing', 'Plumbing', 
    'Electrical', 'Flooring', 'Painting', 'Landscaping'
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (photos.length + files.length <= 10) {
      setPhotos([...photos, ...files]);
      setCaptions([...captions, ...files.map(() => '')]);
    } else {
      alert('Maximum 10 photos allowed per update');
    }
  };

  const handleCaptionChange = (index: number, caption: string) => {
    const newCaptions = [...captions];
    newCaptions[index] = caption;
    setCaptions(newCaptions);
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    const newCaptions = captions.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    setCaptions(newCaptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData = {
      id: `DU${Date.now()}`,
      projectId: selectedProject,
      date: new Date().toISOString().split('T')[0],
      photos: photos.map(photo => URL.createObjectURL(photo)),
      captions,
      category,
      comments,
      userId: 'current-user'
    };
    
    console.log('Daily update submitted:', updateData);
    alert('Daily update submitted successfully!');
    
    // Reset form
    setPhotos([]);
    setCaptions([]);
    setComments('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Daily Progress Updates</h1>
          <p className="text-gray-600">Upload photos and document today's progress</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar size={16} />
          <span>{new Date().toLocaleDateString('en-IN')}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Selection */}
          <div>
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
                  {project.name} ({project.id})
                </option>
              ))}
            </select>
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag size={16} className="inline mr-1" />
              Work Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Camera size={16} className="inline mr-1" />
              Upload Photos (Max 10)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Click to upload photos or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  JPG, PNG, GIF up to 10MB each
                </p>
              </label>
            </div>
          </div>

          {/* Photo Preview */}
          {photos.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Uploaded Photos ({photos.length}/10)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="aspect-video bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Upload ${index + 1}`}
                        className="max-w-full max-h-full object-contain rounded-lg"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Add a caption..."
                      value={captions[index] || ''}
                      onChange={(e) => handleCaptionChange(index, e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="mt-2 text-red-600 text-sm hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MessageSquare size={16} className="inline mr-1" />
              Comments & Notes
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe today's progress, challenges faced, or any important notes..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              <span>Submit Update</span>
            </button>
          </div>
        </form>
      </div>

      {/* Recent Updates */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Updates</h2>
        <div className="space-y-4">
          {/* Mock recent updates */}
          <div className="border-l-4 border-blue-500 pl-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">Foundation Work - Luxury Villa</h3>
                <p className="text-sm text-gray-600">Foundation pouring completed on north side</p>
                <p className="text-xs text-gray-500 mt-1">June 18, 2024 • 4 photos</p>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Foundation</span>
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">Electrical Work - Commercial Complex</h3>
                <p className="text-sm text-gray-600">First floor wiring installation in progress</p>
                <p className="text-xs text-gray-500 mt-1">June 17, 2024 • 6 photos</p>
              </div>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Electrical</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyUpdates;
