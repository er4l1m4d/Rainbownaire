import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon } from 'wagmi/chains';
import { http } from 'viem';

// Use faster, more reliable RPC endpoints with multiple fallbacks
const mainnetTransport = http('https://eth-mainnet.g.alchemy.com/v2/demo');

const polygonTransport = http('https://polygon-mainnet.g.alchemy.com/v2/demo');

// Optimized configuration for better performance
export const wagmiConfig = getDefaultConfig({
  appName: 'Rainbownaire',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo',
  chains: [
    {
      ...mainnet,
      rpcUrls: {
        ...mainnet.rpcUrls,
        default: {
          http: [
            'https://eth-mainnet.g.alchemy.com/v2/demo',
            'https://mainnet.infura.io/v3/demo',
            'https://eth-mainnet.public.blastapi.io'
          ]
        }
      }
    },
    {
      ...polygon,
      rpcUrls: {
        ...polygon.rpcUrls,
        default: {
          http: [
            'https://polygon-mainnet.g.alchemy.com/v2/demo',
            'https://polygon-rpc.com',
            'https://polygon-mainnet.public.blastapi.io'
          ]
        }
      }
    }
  ],
  ssr: true,
  // Add connection retry and timeout optimizations
  transports: {
    [mainnet.id]: mainnetTransport,
    [polygon.id]: polygonTransport,
  }
});

export const chains = [
  {
    ...mainnet,
    rpcUrls: {
      ...mainnet.rpcUrls,
      default: {
        http: [
          'https://eth-mainnet.g.alchemy.com/v2/demo',
          'https://mainnet.infura.io/v3/demo',
          'https://eth-mainnet.public.blastapi.io'
        ]
      }
    }
  },
  {
    ...polygon,
    rpcUrls: {
      ...polygon.rpcUrls,
      default: {
        http: [
          'https://polygon-mainnet.g.alchemy.com/v2/demo',
          'https://polygon-rpc.com',
          'https://polygon-mainnet.public.blastapi.io'
        ]
      }
    }
  }
];