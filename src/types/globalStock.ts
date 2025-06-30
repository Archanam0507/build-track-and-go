
export interface GlobalMaterial {
  id: string;
  material: string;
  unit: string;
  totalReceived: number;
  usedQuantity: number;
  available: number;
  reorderThreshold: number;
  maxCapacity: number;
  forecastedUsage: number;
  lastUpdated: string;
  category: 'Basic Materials' | 'Steel & Metal' | 'Electrical' | 'Plumbing' | 'Finishing';
}

export interface MaterialTransaction {
  id: string;
  materialId: string;
  type: 'DELIVERY' | 'USAGE';
  quantity: number;
  projectId?: string;
  projectName?: string;
  date: string;
  issuedBy: string;
  notes?: string;
  receiptUrl?: string;
}

export interface MaterialAlert {
  id: string;
  materialId: string;
  material: string;
  alertType: 'CRITICAL' | 'LOW_STOCK' | 'REORDER';
  currentStock: number;
  threshold: number;
  message: string;
  createdAt: string;
  acknowledged: boolean;
}

export interface CSVUploadData {
  material: string;
  type: 'DELIVERY' | 'USAGE';
  quantity: number;
  projectName?: string;
  date: string;
  notes?: string;
}
