import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon } from 'wagmi/chains';

// Optimized configuration for better performance
export const wagmiConfig = getDefaultConfig({
  appName: 'Rainbownaire',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo',
  chains: [mainnet, polygon], // Reduced from 5 to 2 chains for faster loading
  ssr: true,
  // Add custom RPC URLs for better performance
  transports: {
    [mainnet.id]: {
      url: 'https://eth-mainnet.g.alchemy.com/v2/demo', // Use your Alchemy key or keep demo for now
    },
    [polygon.id]: {
      url: 'https://polygon-mainnet.g.alchemy.com/v2/demo', // Use your Alchemy key or keep demo for now
    },
  },
});

export const chains = [mainnet, polygon];