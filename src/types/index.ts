export type DealState = 'live' | 'maker' | 'checker';

export interface Deal {
  id: string;
  name: string;
  vanum: string;
  sourceAccount: string;
  state: DealState;
  lastTransaction: string;
  parties: string[];
  transactionLimit: number;
  dailyLimit: number;
  processingFee: number;
  originalDealId?: string;
}

export interface Party {
  id: string;
  name: string;
  vanum: string;
  accountType: 'Debit' | 'Credit';
  status: 'Active' | 'Pending' | 'Verified';
}

export interface PartyBasicDetails {
  participantId: string;
  businessName: string;
  registrationNumber: string;
  businessAddress: string;
  businessType: string;
  status: string;
  vanum: string;
}