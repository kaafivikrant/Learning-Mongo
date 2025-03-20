import { Deal, Party } from '../types';

let mockDeals: Deal[] = [
  {
    id: '12345',
    name: 'Merchant Solutions',
    vanum: 'VA123456',
    sourceAccount: '**** 4567',
    state: 'live',
    lastTransaction: 'Jan 15, 2025',
    parties: ['PART-001', 'PART-002'],
    transactionLimit: 50000,
    dailyLimit: 200000,
    processingFee: 2.5,
  },
  {
    id: '12346',
    name: 'Payment Gateway',
    vanum: 'VA789012',
    sourceAccount: '**** 8901',
    state: 'live',
    lastTransaction: 'Jan 16, 2025',
    parties: ['PART-002'],
    transactionLimit: 75000,
    dailyLimit: 300000,
    processingFee: 2.0,
  },
];

let mockParties: Party[] = [
  {
    id: 'PART-001',
    name: 'Merchant Corp',
    vanum: 'VA88765',
    accountType: 'Debit',
    status: 'Verified',
  },
  {
    id: 'PART-002',
    name: 'Tech Solutions Ltd',
    vanum: 'VA54321',
    accountType: 'Credit',
    status: 'Pending',
  },
];

// Deal Management Functions
const addDeal = (deal: Omit<Deal, 'id' | 'state' | 'lastTransaction'>) => {
  const newDeal: Deal = {
    ...deal,
    id: `DEAL-${Math.random().toString(36).substr(2, 9)}`,
    state: 'maker',
    lastTransaction: 'N/A',
  };
  mockDeals = [...mockDeals, newDeal];
  return newDeal;
};

const updateDeal = (dealId: string, updates: Partial<Deal>) => {
  const deal = mockDeals.find((d) => d.id === dealId);
  if (!deal) return null;

  // Create a copy in maker state
  if (deal.state === 'live') {
    const makerDeal: Deal = {
      ...deal,
      ...updates,
      id: `${deal.id}-draft`,
      state: 'maker',
      originalDealId: deal.id,
    };
    mockDeals = [...mockDeals, makerDeal];
    return makerDeal;
  }

  // Update existing deal in maker/checker state
  mockDeals = mockDeals.map((d) =>
    d.id === dealId ? { ...d, ...updates } : d
  );
  return mockDeals.find((d) => d.id === dealId);
};

const submitDeal = (dealId: string) => {
  mockDeals = mockDeals.map((d) =>
    d.id === dealId ? { ...d, state: 'checker' } : d
  );
};

export const approveDeal = (dealId: string) => {
  const dealIndex = mockDeals.findIndex((deal) => deal.id === dealId);
  if (dealIndex === -1) return null;

  const updatedDeal = {
    ...mockDeals[dealIndex],
    state: 'live',
    lastUpdated: new Date().toISOString(),
  };

  mockDeals[dealIndex] = updatedDeal;
  return updatedDeal;
};

const rejectDeal = (dealId: string) => {
  mockDeals = mockDeals.map((d) =>
    d.id === dealId ? { ...d, state: 'maker' } : d
  );
};

// Party Management Functions
const addParty = (party: Omit<Party, 'id'>) => {
  const newParty: Party = {
    ...party,
    id: `PART-${Math.random().toString(36).substr(2, 9)}`,
  };
  mockParties = [...mockParties, newParty];
  return newParty;
};

const updateParty = (partyId: string, updates: Partial<Party>) => {
  mockParties = mockParties.map((p) =>
    p.id === partyId ? { ...p, ...updates } : p
  );
  return mockParties.find((p) => p.id === partyId);
};

export {
  mockDeals,
  mockParties,
  addDeal,
  updateDeal,
  submitDeal,
  rejectDeal,
  addParty,
  updateParty,
};
