
export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  isAdmin?: boolean;
  avatarUrl?: string;
}

export type SessionRole = 'babysitter' | 'parent';

export interface Session {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  babysitterId: string;
  babysitterName: string;
  parentId: string;
  parentName: string;
  points: number;
  status: 'pending_babysitter' | 'pending_parent' | 'confirmed' | 'disputed';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  points: number; // positive for earned, negative for spent
  type: 'earned' | 'spent' | 'initial' | 'adjustment';
  sessionId?: string;
}

export interface Referral {
  id: string;
  referrerEmail: string;
  referredEmail: string;
  referredName: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  external?: boolean;
  label?: string;
  description?: string;
}

export interface JobPosting {
  id: string;
  requestingParentId: string;
  requestingParentName: string;
  requestingParentAvatar?: string;
  date: Date;
  startTime: string;
  endTime: string;
  numberOfChildren: number;
  childrenAgeRange?: string; // e.g., "3-5 years"
  notes?: string;
  status: 'open' | 'filled' | 'expired'; // 'open' means available
  createdAt: Date;
}
