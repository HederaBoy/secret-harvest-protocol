import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Wallet, AlertCircle, CheckCircle } from "lucide-react";
import { useState, useEffect } from 'react';

const WalletStatus = () => {
  const { address, isConnected, isConnecting } = useAccount();
  const { connect, connectors, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');

  useEffect(() => {
    if (isConnecting || isPending) {
      setConnectionStatus('connecting');
    } else if (isConnected && address) {
      setConnectionStatus('connected');
    } else if (error) {
      setConnectionStatus('error');
    } else {
      setConnectionStatus('idle');
    }
  }, [isConnected, isConnecting, isPending, address, error]);

  const handleConnect = () => {
    if (connectors.length > 0) {
      connect({ connector: connectors[0] });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setConnectionStatus('idle');
  };

  if (connectionStatus === 'connected' && address) {
    return (
      <Card className="p-4 seed-glow bg-card/50 backdrop-blur-sm border-primary/30">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse-glow"></div>
          <div className="flex flex-col flex-1">
            <span className="font-tech text-sm text-muted-foreground">Wallet Connected</span>
            <span className="font-cyber font-semibold text-primary">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDisconnect}
              className="text-xs"
            >
              Disconnect
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (connectionStatus === 'connecting') {
    return (
      <Card className="p-4 border-primary/30 bg-primary/10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
          <div className="flex flex-col">
            <span className="font-tech text-sm text-primary">Connecting...</span>
            <span className="text-xs text-muted-foreground">Please approve in your wallet</span>
          </div>
          <Shield className="w-5 h-5 text-primary ml-auto animate-pulse" />
        </div>
      </Card>
    );
  }

  if (connectionStatus === 'error') {
    return (
      <Card className="p-4 border-destructive/50 bg-destructive/10">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-destructive" />
          <div className="flex flex-col flex-1">
            <span className="font-tech text-sm text-destructive">Connection Failed</span>
            <span className="text-xs text-muted-foreground">
              {error?.message || 'Please try again'}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleConnect}
            className="text-xs"
          >
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 border-primary/20 bg-card/30">
      <div className="flex items-center gap-3">
        <Wallet className="w-5 h-5 text-muted-foreground" />
        <div className="flex flex-col flex-1">
          <span className="font-tech text-sm text-muted-foreground">No Wallet Connected</span>
          <span className="text-xs text-muted-foreground">
            Connect your wallet to start farming
          </span>
        </div>
        <Button
          onClick={handleConnect}
          className="bg-gradient-primary hover:shadow-glow border-0 font-tech font-semibold px-4 py-2 text-sm hover-glow rounded-lg flex items-center gap-2"
        >
          <Shield className="w-4 h-4" />
          Connect Wallet
        </Button>
      </div>
    </Card>
  );
};

export default WalletStatus;
