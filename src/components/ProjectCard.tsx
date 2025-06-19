
import React from 'react';
import { Project } from '../types';
import { Calendar, MapPin, TrendingUp, IndianRupee } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'On Hold': return 'bg-yellow-100 text-yellow-800';
      case 'Planning': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
          <p className="text-sm text-gray-600">{project.id}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <MapPin size={16} className="mr-2" />
          {project.location}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar size={16} className="mr-2" />
          {new Date(project.lastUpdate).toLocaleDateString('en-IN')}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Budget Info */}
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center text-gray-600">
          <IndianRupee size={16} className="mr-1" />
          <span>Budget: {formatCurrency(project.budget)}</span>
        </div>
        <div className="flex items-center text-green-600">
          <TrendingUp size={16} className="mr-1" />
          <span>Spent: {formatCurrency(project.spent)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
