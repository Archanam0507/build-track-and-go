import { User, Project, DailyUpdate, Blueprint, MaterialLog, Payment, Task, Contact } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh@contractor.com',
    phone: '+91-9876543210',
    role: 'Contractor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
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
    ownerId: '1',
    contractorId: '2',
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
    ownerId: '1',
    contractorId: '2',
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
    ownerId: '1',
    contractorId: '2',
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
    ownerId: '1',
    contractorId: '2',
    location: 'Shamshabad, Hyderabad',
    lastUpdate: '2024-05-15',
    category: 'Industrial'
  },
  {
    id: 'P005',
    name: 'Smart Home - Jubilee Hills',
    description: 'IoT-enabled luxury home with automation systems',
    status: 'In Progress',
    progress: 80,
    startDate: '2023-12-01',
    endDate: '2024-07-01',
    budget: 12500000,
    spent: 10000000,
    ownerId: '1',
    contractorId: '2',
    location: 'Jubilee Hills, Hyderabad',
    lastUpdate: '2024-06-18',
    category: 'Residential'
  },
  {
    id: 'P006',
    name: 'Shopping Mall - HITEC City',
    description: 'Multi-level shopping center with food court and entertainment',
    status: 'In Progress',
    progress: 35,
    startDate: '2024-01-01',
    endDate: '2025-06-01',
    budget: 50000000,
    spent: 17500000,
    ownerId: '1',
    contractorId: '2',
    location: 'HITEC City, Hyderabad',
    lastUpdate: '2024-06-12',
    category: 'Commercial'
  }
];

export const mockContacts: Contact[] = [
  {
    id: 'C001',
    name: 'Rajesh Kumar',
    role: 'Owner',
    phone: '+91-9876543210',
    email: 'rajesh@owner.com',
    projects: ['P001', 'P002', 'P003', 'P004', 'P005', 'P006'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'C002',
    name: 'Suresh Contractor',
    role: 'Contractor',
    phone: '+91-9876543211',
    email: 'suresh@contractor.com',
    projects: ['P001', 'P002', 'P003', 'P004', 'P005', 'P006'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'C003',
    name: 'Priya Engineer',
    role: 'Site Engineer',
    phone: '+91-9876543212',
    email: 'priya@engineer.com',
    projects: ['P001', 'P002', 'P005'],
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'C004',
    name: 'Ravi Painter',
    role: 'Painter',
    phone: '+91-9876543215',
    email: 'ravi@painter.com',
    projects: ['P001', 'P003', 'P005'],
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'C005',
    name: 'Amit Accountant',
    role: 'Accountant',
    phone: '+91-9876543213',
    email: 'amit@accountant.com',
    projects: ['P001', 'P002', 'P003', 'P004', 'P005', 'P006'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'C006',
    name: 'Vikram Site Manager',
    role: 'Site Manager',
    phone: '+91-9876543214',
    email: 'vikram@sitemanager.com',
    projects: ['P001', 'P002', 'P004', 'P006'],
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'C007',
    name: 'Krishna Electrician',
    role: 'Electrician',
    phone: '+91-9876543216',
    email: 'krishna@electrician.com',
    projects: ['P001', 'P002', 'P005', 'P006'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'C008',
    name: 'Lakshmi Plumber',
    role: 'Plumber',
    phone: '+91-9876543217',
    email: 'lakshmi@plumber.com',
    projects: ['P001', 'P003', 'P004', 'P005'],
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'C009',
    name: 'Mohan Mason',
    role: 'Mason',
    phone: '+91-9876543218',
    email: 'mohan@mason.com',
    projects: ['P001', 'P002', 'P003', 'P006'],
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'C010',
    name: 'Anita Carpenter',
    role: 'Carpenter',
    phone: '+91-9876543219',
    email: 'anita@carpenter.com',
    projects: ['P001', 'P003', 'P005'],
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'C011',
    name: 'Sunil Welder',
    role: 'Welder',
    phone: '+91-9876543220',
    email: 'sunil@welder.com',
    projects: ['P002', 'P004', 'P006'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'C012',
    name: 'Deepa Tiles Expert',
    role: 'Tiles Expert',
    phone: '+91-9876543221',
    email: 'deepa@tiles.com',
    projects: ['P001', 'P003', 'P005'],
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'C013',
    name: 'Raj Security Guard',
    role: 'Security Guard',
    phone: '+91-9876543222',
    email: 'raj@security.com',
    projects: ['P001', 'P002', 'P003', 'P004', 'P005', 'P006'],
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'C014',
    name: 'Geetha Cleaner',
    role: 'Cleaner',
    phone: '+91-9876543223',
    email: 'geetha@cleaner.com',
    projects: ['P001', 'P002', 'P003', 'P004', 'P005', 'P006'],
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'C015',
    name: 'Ramesh Steel Worker',
    role: 'Steel Worker',
    phone: '+91-9876543224',
    email: 'ramesh@steel.com',
    projects: ['P002', 'P004', 'P006'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
];

// Mock credentials for testing different roles
export const mockCredentials = {
  'rajesh@contractor.com': { password: 'contractor123', userId: '1' },
  'priya@sitemanager.com': { password: 'sitemanager123', userId: '2' },
  'vikram@sitemanager.com': { password: 'sitemanager123', userId: '3' },
  'amit@customer.com': { password: 'customer123', userId: '4' },
  'suresh@customer.com': { password: 'customer123', userId: '5' }
};
