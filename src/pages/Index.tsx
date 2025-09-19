import { useAccount } from 'wagmi';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Logo from "@/components/Logo";
import WalletStatus from "@/components/WalletStatus";
import SeedPod from "@/components/SeedPod";
import GrowingField from "@/components/GrowingField";
import heroImage from "@/assets/hero-farming.jpg";
import { Shield, Zap, Lock, TrendingUp, Sprout, Users } from "lucide-react";

const Index = () => {
  const { isConnected } = useAccount();

  const seedPods = [
    {
      farmId: 1,
      name: "ETH Quantum Pod",
      stakingToken: "ETH",
      rewardToken: "QFT",
      apy: 23.4,
      totalStaked: "1,234.56 ETH",
      userStaked: "12.34 ETH",
      pendingRewards: "156.78",
      isEncrypted: true,
      maturity: 85
    },
    {
      farmId: 2,
      name: "USDC Stealth Farm",
      stakingToken: "USDC",
      rewardToken: "PRIV",
      apy: 18.9,
      totalStaked: "456,789 USDC",
      userStaked: "5,000 USDC",
      pendingRewards: "892.45",
      isEncrypted: true,
      maturity: 67
    },
    {
      farmId: 3,
      name: "BTC Cipher Grove",
      stakingToken: "BTC",
      rewardToken: "CRYPT",
      apy: 31.2,
      totalStaked: "89.45 BTC",
      userStaked: "0.5 BTC",
      pendingRewards: "234.12",
      isEncrypted: false,
      maturity: 42
    },
    {
      farmId: 4,
      name: "FHE Genesis Seed",
      stakingToken: "FHE",
      rewardToken: "GENESIS",
      apy: 45.7,
      totalStaked: "12,345 FHE",
      userStaked: "1,000 FHE",
      pendingRewards: "567.89",
      isEncrypted: true,
      maturity: 95
    }
  ];

  const stats = [
    { label: "Total Value Locked", value: "$12.4M", icon: TrendingUp, color: "text-primary" },
    { label: "Active Farmers", value: "1,247", icon: Users, color: "text-secondary" },
    { label: "Encrypted Rewards", value: "$2.8M", icon: Lock, color: "text-accent" },
    { label: "Pods Growing", value: "47", icon: Sprout, color: "text-bio-green" }
  ];

  return (
    <div className="min-h-screen bg-gradient-field particle-field">
      {/* Header */}
      <header className="relative z-10 p-6 bg-card/20 backdrop-blur-sm border-b border-primary/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo size="lg" />
          <nav className="hidden md:flex items-center gap-8">
            <a href="/farms" className="font-tech text-muted-foreground hover:text-primary transition-colors">
              Farms
            </a>
            <a href="/rewards" className="font-tech text-muted-foreground hover:text-primary transition-colors">
              Rewards
            </a>
            <a href="/analytics" className="font-tech text-muted-foreground hover:text-primary transition-colors">
              Analytics
            </a>
          </nav>
          <WalletStatus />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Futuristic Farming" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/20 to-background/80" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h1 className="font-cyber font-black text-6xl md:text-7xl lg:text-8xl mb-6 text-gradient-primary animate-float">
            Harvest Privately with FHE
          </h1>
          <p className="font-tech text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Yield rewards are encrypted and visible only to farmers until claimed. 
            Stake your assets in our quantum seed pods and grow your wealth in complete privacy.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button variant="hero" size="lg" className="px-12 py-6 text-xl">
              <Sprout className="w-6 h-6 mr-3" />
              Start Farming
            </Button>
            <Button variant="encrypted" size="lg" className="px-12 py-6 text-xl">
              <Shield className="w-6 h-6 mr-3" />
              Learn FHE
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="p-4 bg-card/40 backdrop-blur-sm border-primary/20 hover-glow">
                <div className="flex flex-col items-center gap-2">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  <div className="text-center">
                    <p className={`font-cyber font-bold text-2xl ${stat.color}`}>
                      {stat.value}
                    </p>
                    <p className="font-tech text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-cyber font-bold text-4xl mb-4 text-gradient-secondary">
              Fully Homomorphic Encryption
            </h2>
            <p className="font-tech text-lg text-muted-foreground max-w-2xl mx-auto">
              Your farming rewards are computed and accumulated while remaining completely encrypted. 
              Only you can decrypt and view your true earnings.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-card/40 backdrop-blur-sm border-primary/20 hover-glow text-center">
              <Lock className="w-12 h-12 text-accent mx-auto mb-4 glow-effect" />
              <h3 className="font-cyber font-bold text-xl mb-3 text-gradient-primary">
                Private Rewards
              </h3>
              <p className="font-tech text-muted-foreground">
                Your yield calculations happen in encrypted space. No one can see your earnings until you choose to reveal them.
              </p>
            </Card>

            <Card className="p-8 bg-card/40 backdrop-blur-sm border-primary/20 hover-glow text-center">
              <Zap className="w-12 h-12 text-secondary mx-auto mb-4 glow-effect" />
              <h3 className="font-cyber font-bold text-xl mb-3 text-gradient-secondary">
                Quantum Secure
              </h3>
              <p className="font-tech text-muted-foreground">
                Built on cutting-edge cryptography that remains secure even against quantum computers.
              </p>
            </Card>

            <Card className="p-8 bg-card/40 backdrop-blur-sm border-primary/20 hover-glow text-center">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4 glow-effect" />
              <h3 className="font-cyber font-bold text-xl mb-3 text-gradient-primary">
                Maximum Yield
              </h3>
              <p className="font-tech text-muted-foreground">
                Optimized protocols deliver industry-leading APYs while maintaining complete privacy.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Farming Dashboard */}
      {isConnected && (
        <section className="py-16 px-6 bg-muted/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-cyber font-bold text-4xl mb-4 text-gradient-primary">
                Your Quantum Garden
              </h2>
              <p className="font-tech text-lg text-muted-foreground">
                Manage your encrypted seed pods and harvest rewards in complete privacy
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {seedPods.map((pod, index) => (
                <SeedPod key={index} {...pod} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Separator className="my-16 bg-primary/20" />

      {/* Footer */}
      <footer className="relative py-12 px-6">
        <GrowingField />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <Logo size="md" />
              <p className="font-tech text-sm text-muted-foreground">
                The future of private DeFi farming powered by Fully Homomorphic Encryption.
              </p>
            </div>
            
            <div>
              <h4 className="font-cyber font-bold text-primary mb-4">Protocol</h4>
              <ul className="space-y-2 font-tech text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Whitepaper</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Audits</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-cyber font-bold text-primary mb-4">Community</h4>
              <ul className="space-y-2 font-tech text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Telegram</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Forum</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-cyber font-bold text-primary mb-4">Developers</h4>
              <ul className="space-y-2 font-tech text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Bug Bounty</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Grants</a></li>
              </ul>
            </div>
          </div>
          
          <Separator className="mb-8 bg-primary/20" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-tech text-sm text-muted-foreground">
              © 2024 FHE Farm. All rights reserved.
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <a href="#" className="font-tech text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-tech text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;