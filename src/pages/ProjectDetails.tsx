
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProjects } from '../utils/mockData';
import { Calendar, MapPin, TrendingUp, IndianRupee, ArrowLeft, User, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const project = mockProjects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="text-center py-12">
        <Building2 className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Project not found</h3>
        <p className="mt-1 text-sm text-gray-500">The project you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
              <p className="text-gray-600">Project ID: {project.id}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>
        </div>
      </div>

      {/* Project Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-2">{project.progress}%</div>
            <Progress value={project.progress} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(project.budget)}</div>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <IndianRupee size={16} className="mr-1" />
              Budget allocated
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Amount Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(project.spent)}</div>
            <div className="text-sm text-gray-500 mt-1">
              {Math.round((project.spent / project.budget) * 100)}% of budget
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(project.budget - project.spent)}</div>
            <div className="text-sm text-gray-500 mt-1">Available funds</div>
          </CardContent>
        </Card>
      </div>

      {/* Project Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Description</h4>
              <p className="text-gray-600">{project.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Category</h4>
                <p className="text-gray-600">{project.category}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Location</h4>
                <div className="flex items-center text-gray-600">
                  <MapPin size={16} className="mr-1" />
                  {project.location}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Start Date</h4>
                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-1" />
                  {formatDate(project.startDate)}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">End Date</h4>
                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-1" />
                  {formatDate(project.endDate)}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-1">Last Update</h4>
              <div className="flex items-center text-gray-600">
                <TrendingUp size={16} className="mr-1" />
                {formatDate(project.lastUpdate)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Team</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Contractor</h4>
              <div className="flex items-center space-x-2">
                <User size={16} className="text-gray-400" />
                <span className="text-gray-600">ID: {project.contractorId}</span>
              </div>
            </div>
            
            {project.siteManagerId && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Site Manager</h4>
                <div className="flex items-center space-x-2">
                  <User size={16} className="text-gray-400" />
                  <span className="text-gray-600">ID: {project.siteManagerId}</span>
                </div>
              </div>
            )}

            {project.customerIds.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Customer{project.customerIds.length > 1 ? 's' : ''}</h4>
                {project.customerIds.map((customerId) => (
                  <div key={customerId} className="flex items-center space-x-2 mb-1">
                    <User size={16} className="text-gray-400" />
                    <span className="text-gray-600">ID: {customerId}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4 border-t">
              <h4 className="font-medium text-gray-900 mb-2">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  View Daily Updates
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  View Blueprints
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  View Materials Log
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  View Payments
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetails;
