import type { Session, Transaction, User } from '@/types';

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
    points: 8, // 2 half-hours before midnight (2*1) + 2 half-hours after midnight (2*2) = 2+4 = 6. Oh, 3 hours total. (2x1pt) + (4x2pts) = 2+8=10. My example was 11pm-1am. This is 10pm-1am, so 4 half-hours before midnight, 2 after. (4*1) + (2*2) = 4+4 = 8.
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
    status: 'pending_parent', // Alice (parent) needs to confirm
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
    status: 'pending_babysitter', // Alice (babysitter) needs to confirm (Bob logged it)
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
    points: -6, // This would only reflect after confirmation
    type: 'spent', 
    sessionId: 'session3',
  },
];
