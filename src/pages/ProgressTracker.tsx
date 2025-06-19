
import React, { useState } from 'react';
import { Calendar, Plus, MessageSquare, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { mockProjects } from '../utils/mockData';

const ProgressTracker: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(mockProjects[0].id);
  const [viewMode, setViewMode] = useState<'timeline' | 'kanban'>('timeline');

  // Mock task data for Gantt-like view
  const tasks = [
    {
      id: 'T001',
      name: 'Site Preparation',
      startDate: '2024-01-15',
      endDate: '2024-01-25',
      duration: 10,
      progress: 100,
      status: 'Completed',
      dependencies: [],
      assignedTo: 'Site Team',
      comments: ['Site cleared and leveled', 'Soil testing completed']
    },
    {
      id: 'T002',
      name: 'Foundation Work',
      startDate: '2024-01-26',
      endDate: '2024-02-15',
      duration: 20,
      progress: 100,
      status: 'Completed',
      dependencies: ['T001'],
      assignedTo: 'Foundation Team',
      comments: ['Excavation completed', 'Concrete poured']
    },
    {
      id: 'T003',
      name: 'Structural Framework',
      startDate: '2024-02-16',
      endDate: '2024-03-20',
      duration: 33,
      progress: 85,
      status: 'In Progress',
      dependencies: ['T002'],
      assignedTo: 'Structural Team',
      comments: ['Steel framework 80% complete', 'Beam installation in progress']
    },
    {
      id: 'T004',
      name: 'Roofing Work',
      startDate: '2024-03-21',
      endDate: '2024-04-10',
      duration: 20,
      progress: 45,
      status: 'In Progress',
      dependencies: ['T003'],
      assignedTo: 'Roofing Team',
      comments: ['Roof trusses installed']
    },
    {
      id: 'T005',
      name: 'Electrical Installation',
      startDate: '2024-03-25',
      endDate: '2024-04-20',
      duration: 26,
      progress: 30,
      status: 'In Progress',
      dependencies: ['T003'],
      assignedTo: 'Electrical Team',
      comments: ['Wiring layout planned']
    },
    {
      id: 'T006',
      name: 'Plumbing Installation',
      startDate: '2024-03-25',
      endDate: '2024-04-25',
      duration: 31,
      progress: 25,
      status: 'In Progress',
      dependencies: ['T003'],
      assignedTo: 'Plumbing Team',
      comments: ['Pipe layout in progress']
    },
    {
      id: 'T007',
      name: 'Interior Finishing',
      startDate: '2024-05-01',
      endDate: '2024-06-15',
      duration: 45,
      progress: 0,
      status: 'Not Started',
      dependencies: ['T004', 'T005', 'T006'],
      assignedTo: 'Interior Team',
      comments: []
    },
    {
      id: 'T008',
      name: 'Final Inspection',
      startDate: '2024-06-16',
      endDate: '2024-06-20',
      duration: 5,
      progress: 0,
      status: 'Not Started',
      dependencies: ['T007'],
      assignedTo: 'QA Team',
      comments: []
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500';
      case 'In Progress': return 'bg-blue-500';
      case 'Delayed': return 'bg-red-500';
      case 'Not Started': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'In Progress': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'Delayed': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'Not Started': return <Clock className="w-4 h-4 text-gray-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const calculateTimelinePosition = (startDate: string, endDate: string) => {
    const projectStart = new Date('2024-01-15');
    const projectEnd = new Date('2024-06-20');
    const taskStart = new Date(startDate);
    const taskEnd = new Date(endDate);
    
    const totalDays = (projectEnd.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24);
    const startOffset = (taskStart.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24);
    const duration = (taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24);
    
    return {
      left: `${(startOffset / totalDays) * 100}%`,
      width: `${(duration / totalDays) * 100}%`
    };
  };

  const TimelineView = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Project Timeline</h2>
      
      {/* Timeline Header */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Jan 2024</span>
          <span>Feb 2024</span>
          <span>Mar 2024</span>
          <span>Apr 2024</span>
          <span>May 2024</span>
          <span>Jun 2024</span>
        </div>
        <div className="h-px bg-gray-200"></div>
      </div>

      {/* Tasks */}
      <div className="space-y-4">
        {tasks.map((task) => {
          const position = calculateTimelinePosition(task.startDate, task.endDate);
          return (
            <div key={task.id} className="flex items-center space-x-4">
              <div className="w-48 flex-shrink-0">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(task.status)}
                  <span className="text-sm font-medium text-gray-900">{task.name}</span>
                </div>
                <p className="text-xs text-gray-500">{task.assignedTo}</p>
              </div>
              
              <div className="flex-1 relative h-8">
                <div className="absolute inset-0 bg-gray-100 rounded"></div>
                <div
                  className={`absolute top-0 h-full ${getStatusColor(task.status)} rounded flex items-center justify-center`}
                  style={position}
                >
                  <span className="text-xs text-white font-medium px-2">
                    {task.progress}%
                  </span>
                </div>
              </div>
              
              <div className="w-24 text-right">
                <p className="text-xs text-gray-500">{task.duration} days</p>
                <p className="text-xs text-gray-400">
                  {new Date(task.startDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} - 
                  {new Date(task.endDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const KanbanView = () => {
    const columns = [
      { title: 'Not Started', status: 'Not Started', color: 'bg-gray-100' },
      { title: 'In Progress', status: 'In Progress', color: 'bg-blue-100' },
      { title: 'Completed', status: 'Completed', color: 'bg-green-100' }
    ];

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Kanban Board</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <div key={column.status} className={`${column.color} rounded-lg p-4`}>
              <h3 className="font-medium text-gray-900 mb-4">{column.title}</h3>
              <div className="space-y-3">
                {tasks.filter(task => task.status === column.status).map((task) => (
                  <div key={task.id} className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-medium text-gray-900 mb-2">{task.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{task.assignedTo}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{task.duration} days</span>
                      <span className="text-xs font-medium text-gray-900">{task.progress}%</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getStatusColor(task.status)}`}
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Progress Tracker</h1>
          <p className="text-gray-600">Track project milestones and task dependencies</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-4 py-2 text-sm font-medium ${
                viewMode === 'timeline' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Timeline
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-4 py-2 text-sm font-medium ${
                viewMode === 'kanban' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Kanban
            </button>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={20} />
            <span>Add Task</span>
          </button>
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

      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {tasks.filter(t => t.status === 'Completed').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">
                {tasks.filter(t => t.status === 'In Progress').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length)}%
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Main View */}
      {viewMode === 'timeline' ? <TimelineView /> : <KanbanView />}

      {/* Task Comments */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Task Comments</h2>
        <div className="space-y-4">
          {tasks.filter(task => task.comments.length > 0).slice(0, 3).map((task) => (
            <div key={task.id} className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{task.name}</h3>
                <MessageSquare className="w-4 h-4 text-gray-400" />
              </div>
              <div className="mt-2 space-y-1">
                {task.comments.map((comment, index) => (
                  <p key={index} className="text-sm text-gray-600">• {comment}</p>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">By {task.assignedTo}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
