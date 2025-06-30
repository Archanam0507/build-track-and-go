
import { User, Project } from '../types';

// Single contractor system - only one contractor has full access
export const canViewAllProjects = (user: User): boolean => {
  return user.role === 'Contractor';
};

export const canCreateProject = (user: User): boolean => {
  return user.role === 'Contractor';
};

export const canEditProject = (user: User, projectId?: string): boolean => {
  if (user.role === 'Contractor') return true;
  if (user.role === 'Site Manager' && user.assignedProjectId === projectId) return true;
  return false;
};

export const canDeleteProject = (user: User): boolean => {
  return user.role === 'Contractor';
};

export const canManageUsers = (user: User): boolean => {
  return user.role === 'Contractor';
};

export const canAssignUsers = (user: User): boolean => {
  return user.role === 'Contractor';
};

export const canManageStock = (user: User, projectId?: string): boolean => {
  if (user.role === 'Contractor') return true;
  if (user.role === 'Site Manager' && user.assignedProjectId === projectId) return true;
  return false;
};

export const canViewMaterialData = (user: User, projectId?: string): boolean => {
  if (user.role === 'Contractor') return true;
  if (user.role === 'Site Manager' && user.assignedProjectId === projectId) return true;
  if (user.role === 'Customer' && user.assignedProjectId === projectId) return true;
  return false;
};

export const canRaisePaymentRequest = (user: User, projectId?: string): boolean => {
  if (user.role === 'Contractor') return true;
  if (user.role === 'Site Manager' && user.assignedProjectId === projectId) return true;
  return false;
};

export const canApprovePaymentRequest = (user: User, projectId?: string): boolean => {
  if (user.role === 'Contractor') return true;
  if (user.role === 'Customer' && user.assignedProjectId === projectId) return true;
  return false;
};

export const canViewDailyUpdates = (user: User, projectId?: string): boolean => {
  if (user.role === 'Contractor') return true;
  if (user.role === 'Site Manager' && user.assignedProjectId === projectId) return true;
  if (user.role === 'Customer' && user.assignedProjectId === projectId) return true;
  return false;
};

export const canUpdateDailyProgress = (user: User, projectId?: string): boolean => {
  if (user.role === 'Contractor') return true;
  if (user.role === 'Site Manager' && user.assignedProjectId === projectId) return true;
  return false;
};

// Get projects accessible to the user
export const getAccessibleProjects = (user: User, allProjects: Project[]): Project[] => {
  if (user.role === 'Contractor') {
    return allProjects;
  }
  
  if (user.assignedProjectId) {
    return allProjects.filter(project => project.id === user.assignedProjectId);
  }
  
  return [];
};

// Navigation items based on role
export const getNavigationItems = (user: User) => {
  const baseItems = [
    { path: '/', label: 'Dashboard', icon: 'Home', allowedRoles: ['Contractor', 'Site Manager', 'Customer'] }
  ];

  const allItems = [
    { path: '/daily-updates', label: 'Daily Updates', icon: 'Camera', allowedRoles: ['Contractor', 'Site Manager', 'Customer'] },
    { path: '/blueprints', label: 'Blueprints', icon: 'FileText', allowedRoles: ['Contractor', 'Site Manager', 'Customer'] },
    { path: '/materials', label: 'Materials', icon: 'Package', allowedRoles: ['Contractor', 'Site Manager', 'Customer'] },
    { path: '/stock-tracker', label: 'Stock Tracker', icon: 'Warehouse', allowedRoles: ['Contractor', 'Site Manager'] },
    { path: '/payments', label: 'Payments', icon: 'CreditCard', allowedRoles: ['Contractor', 'Site Manager', 'Customer'] },
    { path: '/paint-picker', label: 'Paint Picker', icon: 'Palette', allowedRoles: ['Contractor', 'Site Manager', 'Customer'] },
    { path: '/progress-tracker', label: 'Progress Tracker', icon: 'BarChart3', allowedRoles: ['Contractor', 'Site Manager', 'Customer'] },
    { path: '/contacts', label: 'Contacts', icon: 'Users', allowedRoles: ['Contractor', 'Site Manager', 'Customer'] }
  ];

  return [...baseItems, ...allItems.filter(item => item.allowedRoles.includes(user.role))];
};
