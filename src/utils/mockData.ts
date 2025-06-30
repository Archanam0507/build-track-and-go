
import { User, Project, Contact } from '../types';

// Single contractor system with assigned users
export const mockUsers: User[] = [
  // The single contractor - full access
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh@contractor.com',
    phone: '+91-9876543210',
    role: 'Contractor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  // Site Managers - each assigned to exactly one project
  {
    id: '2',
    name: 'Priya Site Manager',
    email: 'priya@sitemanager.com',
    phone: '+91-9876543212',
    role: 'Site Manager',
    assignedProjectId: 'P001',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Vikram Site Manager',
    email: 'vikram@sitemanager.com',
    phone: '+91-9876543214',
    role: 'Site Manager',
    assignedProjectId: 'P002',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '6',
    name: 'Sunil Site Manager',
    email: 'sunil@sitemanager.com',
    phone: '+91-9876543216',
    role: 'Site Manager',
    assignedProjectId: 'P003',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  // Customers - each assigned to exactly one project
  {
    id: '4',
    name: 'Amit Customer',
    email: 'amit@customer.com',
    phone: '+91-9876543213',
    role: 'Customer',
    assignedProjectId: 'P001',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'Suresh Customer',
    email: 'suresh@customer.com',
    phone: '+91-9876543215',
    role: 'Customer',
    assignedProjectId: 'P002',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '7',
    name: 'Deepika Customer',
    email: 'deepika@customer.com',
    phone: '+91-9876543217',
    role: 'Customer',
    assignedProjectId: 'P003',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face'
  }
];

export const mockProjects: Project[] = [
  {
    id: 'P001',
    name: 'Luxury Villa - Banjara Hills',
    description: 'Modern 4BHK villa with swimming pool and garden',
    status: 'In Progress',
    progress: 65,
    startDate: '2024-01-15',
    endDate: '2024-08-15',
    budget: 8500000,
    spent: 5525000,
    contractorId: '1',
    siteManagerId: '2',
    customerIds: ['4'],
    location: 'Banjara Hills, Hyderabad',
    lastUpdate: '2024-06-15',
    category: 'Residential'
  },
  {
    id: 'P002',
    name: 'Commercial Complex - Gachibowli',
    description: '3-story commercial building with retail and office spaces',
    status: 'In Progress',
    progress: 45,
    startDate: '2024-02-01',
    endDate: '2024-12-01',
    budget: 15000000,
    spent: 6750000,
    contractorId: '1',
    siteManagerId: '3',
    customerIds: ['5'],
    location: 'Gachibowli, Hyderabad',
    lastUpdate: '2024-06-10',
    category: 'Commercial'
  },
  {
    id: 'P003',
    name: 'Apartment Complex - Kondapur',
    description: '2BHK and 3BHK apartments with modern amenities',
    status: 'Completed',
    progress: 100,
    startDate: '2023-08-01',
    endDate: '2024-03-01',
    budget: 25000000,
    spent: 24500000,
    contractorId: '1',
    siteManagerId: '6',
    customerIds: ['7'],
    location: 'Kondapur, Hyderabad',
    lastUpdate: '2024-03-01',
    category: 'Residential'
  },
  {
    id: 'P004',
    name: 'Industrial Warehouse - Shamshabad',
    description: 'Large-scale warehouse facility with loading docks',
    status: 'On Hold',
    progress: 25,
    startDate: '2024-03-01',
    endDate: '2024-10-01',
    budget: 12000000,
    spent: 3000000,
    contractorId: '1',
    siteManagerId: undefined, // No site manager assigned yet
    customerIds: [],
    location: 'Shamshabad, Hyderabad',
    lastUpdate: '2024-05-15',
    category: 'Industrial'
  }
];

export const mockContacts: Contact[] = [
  {
    id: 'C001',
    name: 'Rajesh Kumar',
    role: 'Contractor',
    phone: '+91-9876543210',
    email: 'rajesh@contractor.com',
    projects: ['P001', 'P002', 'P003', 'P004'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'C002',
    name: 'Priya Site Manager',
    role: 'Site Manager',
    phone: '+91-9876543212',
    email: 'priya@sitemanager.com',
    projects: ['P001'],
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'C003',
    name: 'Vikram Site Manager',
    role: 'Site Manager',
    phone: '+91-9876543214',
    email: 'vikram@sitemanager.com',
    projects: ['P002'],
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'C004',
    name: 'Amit Customer',
    role: 'Customer',
    phone: '+91-9876543213',
    email: 'amit@customer.com',
    projects: ['P001'],
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'C005',
    name: 'Suresh Customer',
    role: 'Customer',
    phone: '+91-9876543215',
    email: 'suresh@customer.com',
    projects: ['P002'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
];

// Mock credentials - only 3 roles now: Contractor, Site Manager, Customer
export const mockCredentials = {
  'rajesh@contractor.com': { password: 'contractor123', userId: '1' },
  'priya@sitemanager.com': { password: 'sitemanager123', userId: '2' },
  'vikram@sitemanager.com': { password: 'sitemanager123', userId: '3' },
  'amit@customer.com': { password: 'customer123', userId: '4' },
  'suresh@customer.com': { password: 'customer123', userId: '5' },
  'sunil@sitemanager.com': { password: 'sitemanager123', userId: '6' },
  'deepika@customer.com': { password: 'customer123', userId: '7' }
};
