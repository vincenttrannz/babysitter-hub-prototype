
import type { Session, Transaction, User, JobPosting } from '@/types';

export const mockUser: User = {
  id: 'user1',
  name: 'Alice Wonderland',
  email: 'alice@example.com',
  points: 25,
  isAdmin: false,
  avatarUrl: 'https://placehold.co/100x100.png',
};

export const mockAdminUser: User = {
  id: 'admin1',
  name: 'Admin User',
  email: 'admin@example.com',
  points: 100,
  isAdmin: true,
  avatarUrl: 'https://placehold.co/100x100.png',
};

export const mockMembers: User[] = [
  mockUser,
  { id: 'user2', name: 'Bob The Builder', email: 'bob@example.com', points: 5, avatarUrl: 'https://placehold.co/100x100.png?text=BB' },
  { id: 'user3', name: 'Charlie Brown', email: 'charlie@example.com', points: -5, avatarUrl: 'https://placehold.co/100x100.png?text=CB' },
  { id: 'user4', name: 'Diana Prince', email: 'diana@example.com', points: 15, avatarUrl: 'https://placehold.co/100x100.png?text=DP' },
];


export const mockSessions: Session[] = [
  {
    id: 'session1',
    date: new Date(2024, 6, 15),
    startTime: '18:00',
    endTime: '21:00',
    babysitterId: 'user2',
    babysitterName: 'Bob The Builder',
    parentId: 'user1',
    parentName: 'Alice Wonderland',
    points: 6, // 3 hours * 2 half-hours/hr * 1 point/half-hour
    status: 'confirmed',
    notes: 'Kids were great!',
    createdAt: new Date(2024, 6, 15, 21, 5),
    updatedAt: new Date(2024, 6, 15, 21, 10),
  },
  {
    id: 'session2',
    date: new Date(2024, 6, 18),
    startTime: '22:00',
    endTime: '01:00', // Next day
    babysitterId: 'user1',
    babysitterName: 'Alice Wonderland',
    parentId: 'user3',
    parentName: 'Charlie Brown',
    points: 8, 
    status: 'confirmed',
    createdAt: new Date(2024, 6, 18, 1, 5),
    updatedAt: new Date(2024, 6, 18, 1, 10),
  },
  {
    id: 'session3',
    date: new Date(2024, 6, 20),
    startTime: '09:00',
    endTime: '12:00',
    babysitterId: 'user4',
    babysitterName: 'Diana Prince',
    parentId: 'user1',
    parentName: 'Alice Wonderland',
    points: 6,
    status: 'pending_parent', 
    notes: 'Morning playdate.',
    createdAt: new Date(2024, 6, 20, 12, 5),
    updatedAt: new Date(2024, 6, 20, 12, 5),
  },
  {
    id: 'session4',
    date: new Date(2024, 6, 22),
    startTime: '19:00',
    endTime: '20:00',
    babysitterId: 'user1',
    babysitterName: 'Alice Wonderland',
    parentId: 'user2',
    parentName: 'Bob The Builder',
    points: 2,
    status: 'pending_babysitter', 
    createdAt: new Date(2024, 6, 22, 20, 5),
    updatedAt: new Date(2024, 6, 22, 20, 5),
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: 'tx1',
    date: new Date(2024, 6, 1),
    description: 'Initial points allocation',
    points: 10,
    type: 'initial',
  },
  {
    id: 'tx2',
    date: new Date(2024, 6, 15),
    description: 'Childcare by Bob The Builder',
    points: -6,
    type: 'spent',
    sessionId: 'session1',
  },
  {
    id: 'tx3',
    date: new Date(2024, 6, 18),
    description: 'Babysat for Charlie Brown',
    points: 8,
    type: 'earned',
    sessionId: 'session2',
  },
  {
    id: 'tx4',
    date: new Date(2024, 6, 20),
    description: 'Childcare by Diana Prince (Pending)',
    points: -6, 
    type: 'spent', 
    sessionId: 'session3',
  },
];

export const mockJobPostings: JobPosting[] = [
  {
    id: 'job1',
    requestingParentId: 'user3', // Charlie Brown
    requestingParentName: 'Charlie Brown',
    requestingParentAvatar: 'https://placehold.co/100x100.png?text=CB',
    date: new Date(new Date().setDate(new Date().getDate() + 3)), // 3 days from now
    startTime: '17:00',
    endTime: '20:00',
    numberOfChildren: 2,
    childrenAgeRange: '4 and 7 years',
    notes: 'Need a sitter for a dinner engagement. Kids are easygoing, love board games!',
    status: 'open',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)), // Posted yesterday
    expressedInterests: [],
  },
  {
    id: 'job2',
    requestingParentId: 'user4', // Diana Prince
    requestingParentName: 'Diana Prince',
    requestingParentAvatar: 'https://placehold.co/100x100.png?text=DP',
    date: new Date(new Date().setDate(new Date().getDate() + 5)), // 5 days from now
    startTime: '09:00',
    endTime: '13:00',
    numberOfChildren: 1,
    childrenAgeRange: '3 years',
    notes: 'Looking for someone to help out on a Saturday morning. My little one enjoys arts and crafts.',
    status: 'open',
    createdAt: new Date(),
    expressedInterests: [],
  },
  {
    id: 'job3',
    requestingParentId: 'user1', // Alice Wonderland - so mockUser owns this one
    requestingParentName: 'Alice Wonderland',
    requestingParentAvatar: 'https://placehold.co/100x100.png',
    date: new Date(new Date().setDate(new Date().getDate() + 7)), // A week from now
    startTime: '19:30',
    endTime: '22:30',
    numberOfChildren: 1,
    childrenAgeRange: '5 years',
    notes: 'Urgent: Sitter needed for next Friday evening. Includes bedtime routine.',
    status: 'open',
    createdAt: new Date(),
    expressedInterests: [],
  },
];

