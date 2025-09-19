import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Card } from "@/components/ui/card";
import { Shield, AlertCircle } from "lucide-react";
import { useState, useEffect } from 'react';

const WalletConnect = () => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Listen for wallet connection errors
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('proto pollution') || 
          event.message.includes('wallet') ||
          event.message.includes('WalletConnect')) {
        setHasError(true);
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <Card className="p-4 border-destructive/50 bg-destructive/10">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-destructive" />
          <div className="flex flex-col">
            <span className="font-tech text-sm text-destructive">Connection Error</span>
            <span className="text-xs text-muted-foreground">
              Please refresh the page and try again
            </span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="group bg-gradient-primary hover:shadow-glow border-0 font-tech font-semibold px-8 py-6 text-lg hover-glow rounded-lg flex items-center gap-2"
                  >
                    <svg className="w-5 h-5 group-hover:animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <Card className="p-4 seed-glow bg-card/50 backdrop-blur-sm border-primary/30">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse-glow"></div>
                    <div className="flex flex-col">
                      <span className="font-tech text-sm text-muted-foreground">Wallet Connected</span>
                      <span className="font-cyber font-semibold text-primary">
                        {account.displayName}
                      </span>
                    </div>
                    <Shield className="w-5 h-5 text-primary ml-auto" />
                  </div>
                </Card>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletConnect;