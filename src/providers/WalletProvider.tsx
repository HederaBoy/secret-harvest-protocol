import React from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { config } from '../../config';

// Configure chains for client
const chains = [sepolia] as const;

// Create wagmi config
const wagmiConfig = createConfig(
  getDefaultConfig({
    appName: 'Secret Harvest Protocol',
    projectId: config.walletConnectProjectId,
    chains,
    transports: {
      [sepolia.id]: http(config.rpcUrl),
    },
  })
);

const queryClient = new QueryClient();

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
