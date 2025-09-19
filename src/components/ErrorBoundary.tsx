import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Only log errors that are not from external extensions
    if (!error.message.includes('proto pollution') && 
        !error.message.includes('contentScript') &&
        !error.message.includes('injected.js')) {
      console.error('App Error Boundary caught an error:', error, errorInfo);
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <AlertTriangle className="w-12 h-12 text-destructive" />
              <h2 className="text-xl font-semibold">Wallet Connection Error</h2>
              <p className="text-muted-foreground text-sm">
                There was an issue connecting to your wallet. This might be due to:
              </p>
              <ul className="text-left text-sm text-muted-foreground space-y-1">
                <li>• Wallet extension not installed</li>
                <li>• Network configuration issues</li>
                <li>• Browser security restrictions</li>
              </ul>
              <div className="flex gap-2">
                <Button onClick={this.handleRetry} className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Retry Connection
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.open('https://rainbow.me', '_blank')}
                >
                  Install Rainbow
                </Button>
              </div>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
