import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Lock, Unlock, Coins, Gift, TrendingUp, Clock, Download } from "lucide-react";

const Rewards = () => {
  const [showEncrypted, setShowEncrypted] = useState(false);

  const pendingRewards = [
    {
      token: "QFT",
      amount: "156.78",
      value: "$2,341.70",
      pool: "ETH Quantum Pod",
      isEncrypted: true,
      claimable: true
    },
    {
      token: "PRIV", 
      amount: "892.45",
      value: "$1,784.90",
      pool: "USDC Stealth Farm",
      isEncrypted: true,
      claimable: true
    },
    {
      token: "CRYPT",
      amount: "234.12", 
      value: "$1,170.60",
      pool: "BTC Cipher Grove",
      isEncrypted: false,
      claimable: false
    },
    {
      token: "GENESIS",
      amount: "567.89",
      value: "$5,678.90",
      pool: "FHE Genesis Seed",
      isEncrypted: true,
      claimable: true
    }
  ];

  const claimHistory = [
    {
      date: "2024-03-15",
      token: "QFT",
      amount: "89.34",
      value: "$1,340.10",
      pool: "ETH Quantum Pod",
      txHash: "0xabcd...1234"
    },
    {
      date: "2024-03-10",
      token: "PRIV",
      amount: "445.67",
      value: "$891.34",
      pool: "USDC Stealth Farm", 
      txHash: "0xefgh...5678"
    },
    {
      date: "2024-03-05",
      token: "GENESIS",
      amount: "123.45",
      value: "$1,234.50",
      pool: "FHE Genesis Seed",
      txHash: "0xijkl...9012"
    }
  ];

  const totalPendingValue = pendingRewards.reduce((sum, reward) => 
    sum + parseFloat(reward.value.replace('$', '').replace(',', '')), 0
  );

  const totalClaimedValue = claimHistory.reduce((sum, claim) =>
    sum + parseFloat(claim.value.replace('$', '').replace(',', '')), 0
  );

  return (
    <div className="min-h-screen bg-gradient-field particle-field">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-cyber font-bold text-4xl mb-4 text-gradient-primary">
            Rewards Dashboard
          </h1>
          <p className="font-tech text-lg text-muted-foreground">
            Track and claim your encrypted farming rewards
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-card/40 backdrop-blur-sm border-primary/20 hover-glow">
            <div className="flex items-center gap-3">
              <Coins className="w-8 h-8 text-harvest-ready" />
              <div>
                <p className="font-tech text-sm text-muted-foreground">Total Pending</p>
                <p className="font-cyber font-bold text-2xl text-harvest-ready">
                  ${totalPendingValue.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/40 backdrop-blur-sm border-primary/20 hover-glow">
            <div className="flex items-center gap-3">
              <Gift className="w-8 h-8 text-primary" />
              <div>
                <p className="font-tech text-sm text-muted-foreground">Total Claimed</p>
                <p className="font-cyber font-bold text-2xl text-primary">
                  ${totalClaimedValue.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/40 backdrop-blur-sm border-primary/20 hover-glow">
            <div className="flex items-center gap-3">
              <Lock className="w-8 h-8 text-accent" />
              <div>
                <p className="font-tech text-sm text-muted-foreground">Encrypted Rewards</p>
                <p className="font-cyber font-bold text-2xl text-accent">
                  {pendingRewards.filter(r => r.isEncrypted).length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/40 backdrop-blur-sm border-primary/20 hover-glow">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-secondary" />
              <div>
                <p className="font-tech text-sm text-muted-foreground">Claimable</p>
                <p className="font-cyber font-bold text-2xl text-secondary">
                  {pendingRewards.filter(r => r.claimable).length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Rewards Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-muted/30">
            <TabsTrigger value="pending" className="font-tech">
              Pending Rewards
            </TabsTrigger>
            <TabsTrigger value="history" className="font-tech">
              Claim History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6">
            {/* Encryption Toggle */}
            <Card className="p-4 bg-card/40 backdrop-blur-sm border-primary/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {showEncrypted ? (
                    <Unlock className="w-5 h-5 text-primary" />
                  ) : (
                    <Lock className="w-5 h-5 text-accent" />
                  )}
                  <span className="font-tech text-sm">
                    {showEncrypted ? "Encrypted rewards decrypted" : "Encrypted rewards hidden"}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEncrypted(!showEncrypted)}
                  className="h-8 px-3 hover:bg-primary/20"
                >
                  {showEncrypted ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Decrypt
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Pending Rewards List */}
            <div className="space-y-4">
              {pendingRewards.map((reward, index) => (
                <Card key={index} className="p-6 bg-card/40 backdrop-blur-sm border-primary/20 hover-glow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {reward.isEncrypted ? (
                          <Lock className="w-6 h-6 text-accent" />
                        ) : (
                          <Unlock className="w-6 h-6 text-primary" />
                        )}
                        {reward.claimable && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-harvest-ready rounded-full animate-pulse-glow"></div>
                        )}
                      </div>
                      
                      <div>
                        <p className="font-cyber font-semibold text-lg text-primary">
                          {reward.token}
                        </p>
                        <p className="font-tech text-sm text-muted-foreground">
                          {reward.pool}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`space-y-1 ${
                        reward.isEncrypted && !showEncrypted ? "encrypted-blur" : "decrypted"
                      }`}>
                        <p className="font-cyber font-bold text-xl text-harvest-ready">
                          {reward.amount} {reward.token}
                        </p>
                        <p className="font-tech text-sm text-muted-foreground">
                          {reward.value}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {reward.claimable ? (
                        <Badge variant="default" className="bg-harvest-ready text-background font-tech">
                          Claimable
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="font-tech">
                          Growing
                        </Badge>
                      )}
                      
                      <Button 
                        disabled={!reward.claimable}
                        className="bg-gradient-secondary font-tech hover:shadow-cyber"
                      >
                        {reward.claimable ? "Claim" : "Pending"}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Bulk Actions */}
            <Card className="p-6 bg-card/40 backdrop-blur-sm border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-cyber font-bold text-lg text-primary mb-2">
                    Bulk Actions
                  </h3>
                  <p className="font-tech text-sm text-muted-foreground">
                    Claim all available rewards in a single transaction
                  </p>
                </div>
                <Button 
                  size="lg"
                  className="bg-gradient-primary font-tech px-8 hover:shadow-glow"
                  disabled={!pendingRewards.some(r => r.claimable)}
                >
                  <Coins className="w-5 h-5 mr-2" />
                  Claim All ({pendingRewards.filter(r => r.claimable).length})
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            {/* Export Button */}
            <div className="flex justify-end">
              <Button variant="outline" className="border-primary/30 hover:bg-primary/20">
                <Download className="w-4 h-4 mr-2" />
                Export History
              </Button>
            </div>

            {/* Claim History */}
            <div className="space-y-4">
              {claimHistory.map((claim, index) => (
                <Card key={index} className="p-6 bg-card/40 backdrop-blur-sm border-primary/20 hover-glow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        <Clock className="w-6 h-6 text-primary mb-1" />
                        <span className="font-tech text-xs text-muted-foreground">
                          {claim.date}
                        </span>
                      </div>
                      
                      <div>
                        <p className="font-cyber font-semibold text-lg text-primary">
                          {claim.token}
                        </p>
                        <p className="font-tech text-sm text-muted-foreground">
                          {claim.pool}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-cyber font-bold text-xl text-harvest-ready">
                        +{claim.amount} {claim.token}
                      </p>
                      <p className="font-tech text-sm text-muted-foreground">
                        {claim.value}
                      </p>
                    </div>

                    <div className="text-right">
                      <Badge variant="outline" className="font-tech mb-2">
                        Claimed
                      </Badge>
                      <p className="font-tech text-xs text-muted-foreground">
                        {claim.txHash}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {claimHistory.length === 0 && (
              <Card className="p-12 text-center bg-card/40 backdrop-blur-sm border-primary/20">
                <div className="space-y-4">
                  <Gift className="w-16 h-16 text-muted-foreground mx-auto" />
                  <h3 className="font-cyber font-bold text-xl text-muted-foreground">
                    No claims yet
                  </h3>
                  <p className="font-tech text-muted-foreground">
                    Your claim history will appear here once you start harvesting rewards
                  </p>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Rewards;