import React, { createContext, useContext, useState, useEffect } from 'react';
import { Job, Housing, SavedItem } from '../types/index.ts';
import { mockJobs, mockHousing } from '../data/mockData.ts';

interface DataContextType {
  jobs: Job[];
  housing: Housing[];
  savedItems: SavedItem[];
  addJob: (job: Omit<Job, 'id' | 'createdAt'>) => void;
  addHousing: (housing: Omit<Housing, 'id' | 'createdAt'>) => void;
  saveItem: (type: 'job' | 'housing', itemId: string) => void;
  unsaveItem: (type: 'job' | 'housing', itemId: string) => void;
  getNearbyHousing: (jobId: string) => Housing[];
  getJobById: (id: string) => Job | undefined;
  getHousingById: (id: string) => Housing | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [housing, setHousing] = useState<Housing[]>(mockHousing);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  useEffect(() => {
    // Load saved items from localStorage
    const saved = localStorage.getItem('savedItems');
    if (saved) {
      setSavedItems(JSON.parse(saved));
    }
  }, []);

  const addJob = (jobData: Omit<Job, 'id' | 'createdAt'>) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setJobs(prev => [newJob, ...prev]);
  };

  const addHousing = (housingData: Omit<Housing, 'id' | 'createdAt'>) => {
    const newHousing: Housing = {
      ...housingData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setHousing(prev => [newHousing, ...prev]);
  };

  const saveItem = (type: 'job' | 'housing', itemId: string) => {
    const newSavedItem: SavedItem = {
      id: Date.now().toString(),
      type,
      itemId,
      userId: '1', // In a real app, get from auth context
      savedAt: new Date().toISOString(),
    };
    
    setSavedItems(prev => {
      const updated = [...prev, newSavedItem];
      localStorage.setItem('savedItems', JSON.stringify(updated));
      return updated;
    });
  };

  const unsaveItem = (type: 'job' | 'housing', itemId: string) => {
    setSavedItems(prev => {
      const updated = prev.filter(item => !(item.type === type && item.itemId === itemId));
      localStorage.setItem('savedItems', JSON.stringify(updated));
      return updated;
    });
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getNearbyHousing = (jobId: string): Housing[] => {
    const job = jobs.find(j => j.id === jobId);
    if (!job || !job.coordinates) return [];

    return housing
      .filter(h => h.coordinates)
      .map(h => ({
        ...h,
        distance: calculateDistance(
          job.coordinates!.lat,
          job.coordinates!.lng,
          h.coordinates!.lat,
          h.coordinates!.lng
        )
      }))
      .sort((a, b) => (a.distance || 0) - (b.distance || 0))
      .slice(0, 6); // Return top 6 closest options
  };

  const getJobById = (id: string) => jobs.find(job => job.id === id);
  const getHousingById = (id: string) => housing.find(house => house.id === id);

  return (
    <DataContext.Provider value={{
      jobs,
      housing,
      savedItems,
      addJob,
      addHousing,
      saveItem,
      unsaveItem,
      getNearbyHousing,
      getJobById,
      getHousingById,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}