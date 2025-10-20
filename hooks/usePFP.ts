'use client';

import { useState, useEffect } from 'react';

const PFP_STORAGE_KEY = 'rainbownaire_pfp';

export function usePFP() {
  const [pfpData, setPfpData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load PFP from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(PFP_STORAGE_KEY);
      if (stored) {
        setPfpData(stored);
      }
    } catch (error) {
      console.error('Error loading PFP from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save PFP to localStorage whenever it changes
  const updatePFP = (newPfpData: string | null) => {
    setPfpData(newPfpData);

    try {
      if (newPfpData) {
        localStorage.setItem(PFP_STORAGE_KEY, newPfpData);
      } else {
        localStorage.removeItem(PFP_STORAGE_KEY);
      }
    } catch (error) {
      console.error('Error saving PFP to localStorage:', error);
    }
  };

  const clearPFP = () => {
    updatePFP(null);
  };

  return {
    pfpData,
    updatePFP,
    clearPFP,
    isLoading,
    hasPFP: Boolean(pfpData)
  };
}
