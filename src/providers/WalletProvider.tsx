import React from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { config } from '../../config';

// Configure chains for client
const chains = [sepolia] as const;

// Get RPC URL with fallback
const getRpcUrl = () => {
  if (config.rpcUrl && !config.rpcUrl.includes('your_api_key')) {
    return config.rpcUrl;
  }
  return config.alternativeRpcUrl;
};

// Get WalletConnect Project ID with fallback
const getProjectId = () => {
  if (config.walletConnectProjectId && !config.walletConnectProjectId.includes('your_project_id')) {
    return config.walletConnectProjectId;
  }
  // Use a default project ID for development
  return '2ec9743d0d0cd7fb94dee1a7e6d33475';
};

// Create wagmi config with error handling
const wagmiConfig = createConfig(
  getDefaultConfig({
    appName: 'Secret Harvest Protocol',
    projectId: getProjectId(),
    chains,
    transports: {
      [sepolia.id]: http(getRpcUrl(), {
        retryCount: 3,
        retryDelay: 1000,
      }),
    },
    ssr: true,
  })
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: 1000,
    },
  },
});

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
