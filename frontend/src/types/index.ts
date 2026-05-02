export type RequestStatus = 'DRAFT' | 'PENDING' | 'PROCESSING' | 'READY' | 'DELIVERED' | 'CANCELLED';
export type AssetStatus = 'IN_STOCK' | 'IN_USE' | 'MAINTENANCE' | 'SCRAPPED';
export type AccountStatus = 'AVAILABLE' | 'ASSIGNED';

export interface Request {
  id: string;
  employeeName: string;
  department: string;
  jobRole: string;
  status: RequestStatus;
  requestDate: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  assignments?: Assignment[];
}

export interface Asset {
  id: string;
  assetTag: string;
  category: string;
  model: string;
  status: AssetStatus;
  currentUserId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Account {
  id: string;
  serviceName: string;
  accountId: string;
  initialPassword: string;
  status: AccountStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Assignment {
  id: string;
  requestId: string;
  assetId: string | null;
  accountId: string | null;
  assignedAt: string;
  assignedBy: string;
  asset?: Asset;
  account?: Account;
}
