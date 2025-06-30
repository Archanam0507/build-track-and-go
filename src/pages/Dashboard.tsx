
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockProjects } from '../utils/mockData';
import { getAccessibleProjects, canCreateProject } from '../utils/permissions';
import { Building, Users, DollarSign, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  const accessibleProjects = getAccessibleProjects(user, mockProjects);
  
  // Calculate statistics based on accessible projects
  const totalProjects = accessibleProjects.length;
  const activeProjects = accessibleProjects.filter(p => p.status === 'In Progress').length;
  const completedProjects = accessibleProjects.filter(p => p.status === 'Completed').length;
  const totalBudget = accessibleProjects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = accessibleProjects.reduce((sum, p) => sum + p.spent, 0);

  const getRoleDashboardTitle = () => {
    switch (user.role) {
      case 'Contractor':
        return 'Contractor Dashboard - Full Platform Overview';
      case 'Site Manager':
        return user.assignedProjectId 
          ? `Site Manager Dashboard - Project ${user.assignedProjectId}` 
          : 'Site Manager Dashboard - No Project Assigned';
      case 'Customer':
        return user.assignedProjectId 
          ? `Project Owner Dashboard - Project ${user.assignedProjectId}` 
          : 'Customer Dashboard - No Project Assigned';
      default:
        return 'Dashboard';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'Planning':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{getRoleDashboardTitle()}</h1>
        <p className="text-gray-600">
          {user.role === 'Contractor' && 'Manage all construction projects, users, and platform operations'}
          {user.role === 'Site Manager' && 'Update progress, manage materials, and raise payment requests for your assigned project'}
          {user.role === 'Customer' && 'Monitor your project progress, view materials, and approve payments'}
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Building className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                {user.role === 'Contractor' ? 'Total Projects' : 'Your Project'}
              </p>
              <p className="text-2xl font-bold text-gray-900">{totalProjects}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Projects</p>
              <p className="text-2xl font-bold text-gray-900">{activeProjects}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">₹{(totalBudget / 10000000).toFixed(1)}Cr</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Budget Used</p>
              <p className="text-2xl font-bold text-gray-900">{totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Overview */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {user.role === 'Contractor' ? 'All Projects' : 'Your Project'}
            </h2>
            {canCreateProject(user) && (
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                New Project
              </button>
            )}
          </div>
        </div>
        
        <div className="p-6">
          {accessibleProjects.length === 0 ? (
            <div className="text-center py-8">
              <Building className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No projects</h3>
              <p className="mt-1 text-sm text-gray-500">
                {user.role === 'Contractor' 
                  ? 'Get started by creating your first project.' 
                  : 'You have not been assigned to any projects yet.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accessibleProjects.map((project) => (
                <Link 
                  key={project.id} 
                  to={`/project/${project.id}`}
                  className="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{project.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Progress:</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between">
                      <span>Budget:</span>
                      <span className="font-medium">₹{(project.budget / 10000000).toFixed(1)}Cr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span className="font-medium truncate ml-2">{project.location}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Role-specific Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {user.role === 'Contractor' && (
            <>
              <Link to="/stock-tracker" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="h-8 w-8 text-blue-600 mb-2" />
                <span className="text-sm font-medium">Manage Users</span>
              </Link>
              <Link to="/payments" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <DollarSign className="h-8 w-8 text-green-600 mb-2" />
                <span className="text-sm font-medium">All Payments</span>
              </Link>
            </>
          )}
          
          {(user.role === 'Contractor' || user.role === 'Site Manager') && (
            <>
              <Link to="/daily-updates" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Calendar className="h-8 w-8 text-purple-600 mb-2" />
                <span className="text-sm font-medium">Daily Updates</span>
              </Link>
              <Link to="/stock-tracker" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Building className="h-8 w-8 text-orange-600 mb-2" />
                <span className="text-sm font-medium">Stock Tracker</span>
              </Link>
            </>
          )}
          
          <Link to="/progress-tracker" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <TrendingUp className="h-8 w-8 text-indigo-600 mb-2" />
            <span className="text-sm font-medium">Progress</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
