import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import WalletConnect from "@/components/WalletConnect";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  onWalletConnect?: (address: string) => void;
  walletConnected?: boolean;
  walletAddress?: string;
}

const Navigation = ({ onWalletConnect, walletConnected, walletAddress }: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleWalletConnect = (address: string) => {
    onWalletConnect?.(address);
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/farms", label: "Farms" },
    { href: "/rewards", label: "Rewards" },
    { href: "/analytics", label: "Analytics" }
  ];

  return (
    <header className="relative z-10 p-6 bg-card/20 backdrop-blur-sm border-b border-primary/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo size="lg" />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`font-tech transition-colors ${
                location.pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>

        {/* Wallet Connect - Desktop */}
        <div className="hidden md:block">
          <WalletConnect 
            onConnect={handleWalletConnect}
            connected={walletConnected || false}
            address={walletAddress}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-sm border-b border-primary/20 p-6">
          <nav className="flex flex-col gap-4 mb-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`font-tech transition-colors ${
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          <WalletConnect 
            onConnect={handleWalletConnect}
            connected={walletConnected || false}
            address={walletAddress}
          />
        </div>
      )}
    </header>
  );
};

export default Navigation;