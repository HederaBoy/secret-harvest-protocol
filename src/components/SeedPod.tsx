import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Sprout, Coins, Lock, Unlock } from "lucide-react";

interface SeedPodProps {
  name: string;
  stakingToken: string;
  rewardToken: string;
  apy: number;
  totalStaked: string;
  userStaked: string;
  pendingRewards: string;
  isEncrypted: boolean;
  maturity: number; // 0-100
}

const SeedPod = ({
  name,
  stakingToken,
  rewardToken,
  apy,
  totalStaked,
  userStaked,
  pendingRewards,
  isEncrypted,
  maturity
}: SeedPodProps) => {
  const [showRewards, setShowRewards] = useState(!isEncrypted);
  
  const maturityColor = maturity > 80 ? "text-harvest-ready" : 
                       maturity > 40 ? "text-primary" : "text-muted-foreground";
  
  const maturityGlow = maturity > 80 ? "shadow-[0_0_20px_hsl(60_100%_50%/0.4)]" : 
                      maturity > 40 ? "seed-glow" : "";

  return (
    <Card className={`p-6 bg-card/60 backdrop-blur-sm border-primary/20 hover-glow transition-all duration-300 ${maturityGlow}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Sprout className={`w-8 h-8 ${maturityColor}`} />
              {maturity > 80 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-harvest-ready rounded-full animate-pulse-glow"></div>
              )}
            </div>
            <div>
              <h3 className="font-cyber font-bold text-lg text-gradient-primary">{name}</h3>
              <p className="font-tech text-sm text-muted-foreground">
                {stakingToken} → {rewardToken}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="font-tech font-semibold">
            {apy.toFixed(1)}% APY
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-tech text-muted-foreground">Growth Progress</span>
            <span className={`font-tech font-semibold ${maturityColor}`}>{maturity}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${
                maturity > 80 ? "bg-gradient-to-r from-primary to-harvest-ready" : "bg-gradient-primary"
              }`}
              style={{ width: `${maturity}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="font-tech text-xs text-muted-foreground">Total Staked</p>
            <p className="font-cyber font-semibold text-primary">{totalStaked}</p>
          </div>
          <div className="space-y-1">
            <p className="font-tech text-xs text-muted-foreground">Your Stake</p>
            <p className="font-cyber font-semibold text-secondary">{userStaked}</p>
          </div>
        </div>

        {/* Encrypted Rewards */}
        <div className="p-4 bg-muted/30 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {isEncrypted && !showRewards ? (
                <Lock className="w-4 h-4 text-accent" />
              ) : (
                <Unlock className="w-4 h-4 text-primary" />
              )}
              <span className="font-tech text-sm text-muted-foreground">Pending Rewards</span>
            </div>
            {isEncrypted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowRewards(!showRewards)}
                className="h-8 w-8 p-0 hover:bg-primary/20"
              >
                {showRewards ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
          <div className={`flex items-center gap-2 ${
            isEncrypted && !showRewards ? "encrypted-blur" : "decrypted"
          }`}>
            <Coins className="w-5 h-5 text-harvest-ready" />
            <span className="font-cyber font-bold text-xl text-harvest-ready">
              {pendingRewards} {rewardToken}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1 font-tech border-primary/30 hover:bg-primary/20"
          >
            Stake More
          </Button>
          <Button 
            className="flex-1 bg-gradient-secondary font-tech hover:shadow-cyber"
            disabled={maturity < 100}
          >
            {maturity >= 100 ? "Harvest" : "Growing..."}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SeedPod;