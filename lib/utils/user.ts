/**
 * User utility functions for consistent nickname and address handling across the app
 */

// Helper function to shorten address
export const shortenAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

/**
 * Get the display name for a user (nickname or shortened wallet address)
 * @param address - The wallet address
 * @param nickname - The user's nickname (optional)
 * @returns The display name to show in the UI
 */
export const getDisplayName = (address: string | undefined, nickname?: string | null): string => {
  if (!address) return 'Wallet Connected';

  if (nickname && nickname.trim()) {
    return nickname.trim();
  }

  return shortenAddress(address);
};

/**
 * Get the stored nickname for a wallet address from localStorage
 * @param address - The wallet address
 * @returns The stored nickname or null if not found
 */
export const getStoredNickname = (address: string): string | null => {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(`nickname_${address.toLowerCase()}`);
    return stored || null;
  } catch (error) {
    console.error('Error getting stored nickname:', error);
    return null;
  }
};

/**
 * Store a nickname for a wallet address in localStorage
 * @param address - The wallet address
 * @param nickname - The nickname to store
 */
export const storeNickname = (address: string, nickname: string): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(`nickname_${address.toLowerCase()}`, nickname.trim());
  } catch (error) {
    console.error('Error storing nickname:', error);
  }
};

/**
 * Remove a stored nickname for a wallet address
 * @param address - The wallet address
 */
export const removeStoredNickname = (address: string): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(`nickname_${address.toLowerCase()}`);
  } catch (error) {
    console.error('Error removing stored nickname:', error);
  }
};
