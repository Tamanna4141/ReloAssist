export interface User {
  id: string;
  name: string;
  email: string;
  userType: 'user' | 'admin';
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  city: string;
  salary: number;
  salaryType: 'monthly' | 'annual';
  description: string;
  requirements: string[];
  workplaceAddress: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  employmentType: 'full-time' | 'part-time' | 'contract';
  experienceLevel: 'entry' | 'mid' | 'senior';
  postedBy: string;
  isApproved: boolean;
  createdAt: string;
}

export interface Housing {
  id: string;
  title: string;
  type: 'apartment' | 'house' | 'pg' | 'shared';
  rent: number;
  deposit: number;
  city: string;
  area: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  description: string;
  images: string[];
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  isAvailable: boolean;
  isApproved: boolean;
  postedBy: string;
  createdAt: string;
  distance?: number; // Added when calculating distance from jobs
}

export interface SavedItem {
  id: string;
  type: 'job' | 'housing';
  itemId: string;
  userId: string;
  savedAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  appliedAt: string;
}

export interface RelocationSummary {
  jobId: string;
  housingId: string;
  estimatedSalary: number;
  monthlyRent: number;
  commuteDistance: number;
  commuteTime: number;
  commuteCost: number;
  totalMonthlyCost: number;
  netIncome: number;
}