
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Owner' | 'Contractor' | 'Engineer' | 'Accountant' | 'Site Manager';
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'In Progress' | 'Completed' | 'On Hold' | 'Planning';
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  ownerId: string;
  contractorId: string;
  location: string;
  lastUpdate: string;
  category: string;
}

export interface DailyUpdate {
  id: string;
  projectId: string;
  date: string;
  photos: string[];
  captions: string[];
  category: string;
  comments: string;
  userId: string;
}

export interface Blueprint {
  id: string;
  projectId: string;
  name: string;
  category: 'Elevation' | 'Structure' | 'Electrical' | 'Plumbing' | 'Paint';
  fileUrl: string;
  uploadDate: string;
  version: number;
}

export interface MaterialLog {
  id: string;
  projectId: string;
  material: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalPrice: number;
  vendor: string;
  date: string;
  receiptUrl?: string;
}

export interface Payment {
  id: string;
  projectId: string;
  type: 'Labour' | 'Advance' | 'Machinery' | 'Materials';
  amount: number;
  description: string;
  status: 'Pending' | 'Approved' | 'Paid' | 'Rejected';
  dueDate: string;
  bankDetails?: string;
  upiId?: string;
  proofUrl?: string;
  requestedBy: string;
  approvedBy?: string;
  createdAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  name: string;
  startDate: string;
  endDate: string;
  duration: number;
  progress: number;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Delayed';
  dependencies: string[];
  assignedTo: string;
  comments: string[];
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  projects: string[];
  avatar?: string;
}
