
import type { Session, Transaction, User, JobPosting, ExpressedInterest } from '@/types';

export const mockUser: User = {
  id: 'user1',
  name: 'Alice Wonderland',
  email: 'alice@example.com',
  points: 25,
  isAdmin: true, // Alice creates her hub, so she's an admin
  avatarUrl: 'https://placehold.co/100x100.png',
  hubName: "Alice's Family Hub", // Pre-populated
  hubCode: 'ALICEHUB', // Pre-populated
};

export const mockAdminUser: User = { // This user is a global admin, but also part of a hub
  id: 'admin1',
  name: 'Admin User',
  email: 'admin@example.com',
  points: 100,
  isAdmin: true,
  avatarUrl: 'https://placehold.co/100x100.png',
  hubName: "Admin's Community Hub", // Pre-populated
  hubCode: 'ADMINHUB', // Pre-populated
};

export const mockMembers: User[] = [
  mockUser,
  { id: 'user2', name: 'Bob The Builder', email: 'bob@example.com', points: 5, avatarUrl: 'https://placehold.co/100x100.png?text=BB', hubName: "Alice's Family Hub", hubCode: 'ALICEHUB' },
  { id: 'user3', name: 'Charlie Brown', email: 'charlie@example.com', points: -5, avatarUrl: 'https://placehold.co/100x100.png?text=CB', hubName: "Alice's Family Hub", hubCode: 'ALICEHUB' },
  { id: 'user4', name: 'Diana Prince', email: 'diana@example.com', points: 15, avatarUrl: 'https://placehold.co/100x100.png?text=DP', hubName: "Alice's Family Hub", hubCode: 'ALICEHUB' },
];


export const mockSessions: Session[] = [
  {
    id: 'session1',
    date: new Date(2024, 6, 15), // July 15, 2024
    startTime: '18:00',
    endTime: '21:00',
    babysitterId: 'user2',
    babysitterName: 'Bob The Builder',
    parentId: 'user1',
    parentName: 'Alice Wonderland',
    points: 6, 
    status: 'confirmed',
    notes: 'Kids were great!',
    createdAt: new Date(2024, 6, 15, 21, 5),
    updatedAt: new Date(2024, 6, 15, 21, 10),
  },
  {
    id: 'session2',
    date: new Date(2024, 6, 18), // July 18, 2024
    startTime: '22:00',
    endTime: '01:00', 
    babysitterId: 'user1',
    babysitterName: 'Alice Wonderland',
    parentId: 'user3',
    parentName: 'Charlie Brown',
    points: 8, 
    status: 'confirmed',
    createdAt: new Date(2024, 6, 19, 1, 5), // Adjusted to match typical logging after session
    updatedAt: new Date(2024, 6, 19, 1, 10),
  },
  {
    id: 'session3',
    date: new Date(2024, 6, 20), // July 20, 2024
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
    date: new Date(2024, 6, 22), // July 22, 2024
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

const now = new Date(); // Define 'now' once for consistent relative dates

const mockCreationDate1 = new Date(2024, 6, 24); 
const mockJobDate1 = new Date(2024, 6, 29);     

const mockCreationDate2 = new Date(2024, 6, 25); 
const mockJobDate2 = new Date(2024, 6, 31);    

const mockCreationDate3 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1); // Yesterday
const mockJobDate3 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3); // 3 days from now


// Interests for Alice's job (job3)
const mockInterestFromBob: ExpressedInterest = {
  userId: 'user2',
  userName: 'Bob The Builder',
  userAvatar: 'https://placehold.co/100x100.png?text=BB',
  message: 'Hi Alice, I can help out with this!',
  timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
};

const mockInterestFromCharlie: ExpressedInterest = {
  userId: 'user3',
  userName: 'Charlie Brown',
  userAvatar: 'https://placehold.co/100x100.png?text=CB',
  message: 'I am available and would love to take this job.',
  timestamp: new Date(now.getTime() - 23 * 60 * 60 * 1000), // 23 hours ago (nearly expired)
};

const mockInterestFromDiana: ExpressedInterest = {
  userId: 'user4',
  userName: 'Diana Prince',
  userAvatar: 'https://placehold.co/100x100.png?text=DP',
  message: 'Interested! My kids are of similar age.',
  timestamp: new Date(now.getTime() - 25 * 60 * 60 * 1000), // 25 hours ago (expired)
};


export const mockJobPostings: JobPosting[] = [
  {
    id: 'job1',
    requestingParentId: 'user3', 
    requestingParentName: 'Charlie Brown',
    requestingParentAvatar: 'https://placehold.co/100x100.png?text=CB',
    date: mockJobDate1,
    startTime: '17:00',
    endTime: '20:00',
    numberOfChildren: 2,
    childrenAgeRange: '4 and 7 years',
    notes: 'Need a sitter for a dinner engagement. Kids are easygoing, love board games!',
    status: 'open',
    createdAt: mockCreationDate1,
    expressedInterests: [],
  },
  {
    id: 'job2',
    requestingParentId: 'user4', 
    requestingParentName: 'Diana Prince',
    requestingParentAvatar: 'https://placehold.co/100x100.png?text=DP',
    date: mockJobDate2,
    startTime: '09:00',
    endTime: '13:00',
    numberOfChildren: 1,
    childrenAgeRange: '3 years',
    notes: 'Looking for someone to help out on a Saturday morning. My little one enjoys arts and crafts.',
    status: 'open',
    createdAt: mockCreationDate2,
    expressedInterests: [],
  },
  {
    id: 'job3',
    requestingParentId: 'user1', 
    requestingParentName: 'Alice Wonderland',
    requestingParentAvatar: 'https://placehold.co/100x100.png',
    date: mockJobDate3, 
    startTime: '19:30',
    endTime: '22:30',
    numberOfChildren: 1,
    childrenAgeRange: '5 years',
    notes: 'Sitter needed for next Friday evening. Includes bedtime routine.',
    status: 'open',
    createdAt: mockCreationDate3,
    expressedInterests: [mockInterestFromBob, mockInterestFromCharlie, mockInterestFromDiana],
  },
];
