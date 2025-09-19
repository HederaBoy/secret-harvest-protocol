import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Sprout, Coins, Lock, Unlock, Loader2 } from "lucide-react";
import { useSecretHarvest } from "@/hooks/useContract";
import { useFHE } from "@/utils/encryption";
import { useAccount } from "wagmi";

interface SeedPodProps {
  farmId: number;
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
  farmId,
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
  const [stakeAmount, setStakeAmount] = useState("");
  const [isStaking, setIsStaking] = useState(false);
  const [isHarvesting, setIsHarvesting] = useState(false);
  
  const { address } = useAccount();
  const { stakeTokens, claimRewards, isLoading } = useSecretHarvest();
  const { calculateEncryptedRewards, generateProof, decryptReward } = useFHE();

  // Handle staking with FHE encryption
  const handleStake = async () => {
    if (!stakeAmount || !address) return;
    
    setIsStaking(true);
    try {
      // Calculate encrypted rewards for the stake
      const encryptedRewards = calculateEncryptedRewards(stakeAmount, apy, 86400); // 1 day
      
      // Stake tokens with encrypted rewards
      await stakeTokens(farmId, stakeAmount);
      
      // Reset form
      setStakeAmount("");
    } catch (error) {
      console.error("Error staking:", error);
    } finally {
      setIsStaking(false);
    }
  };

  // Handle harvesting encrypted rewards
  const handleHarvest = async () => {
    if (!address) return;
    
    setIsHarvesting(true);
    try {
      // Generate encrypted rewards and proof
      const encryptedRewards = calculateEncryptedRewards(userStaked, apy, 86400);
      const proof = generateProof(farmId, address, encryptedRewards);
      
      // Claim rewards with encrypted data
      await claimRewards(farmId, encryptedRewards, proof);
    } catch (error) {
      console.error("Error harvesting:", error);
    } finally {
      setIsHarvesting(false);
    }
  };

  // Toggle reward visibility (decrypt/encrypt)
  const toggleRewardVisibility = () => {
    if (isEncrypted && !showRewards) {
      // Decrypt rewards to show actual amount
      const decryptedAmount = decryptReward(pendingRewards);
      setShowRewards(true);
    } else {
      setShowRewards(!showRewards);
    }
  };
  
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
                onClick={toggleRewardVisibility}
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

        {/* Stake Input */}
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Amount to stake"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            className="w-full px-3 py-2 bg-muted/50 border border-primary/30 rounded-lg font-tech text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1 font-tech border-primary/30 hover:bg-primary/20"
            onClick={handleStake}
            disabled={!stakeAmount || isStaking || isLoading}
          >
            {isStaking ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Staking...
              </>
            ) : (
              "Stake More"
            )}
          </Button>
          <Button 
            className="flex-1 bg-gradient-secondary font-tech hover:shadow-cyber"
            disabled={maturity < 100 || isHarvesting || isLoading}
            onClick={handleHarvest}
          >
            {isHarvesting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Harvesting...
              </>
            ) : maturity >= 100 ? (
              "Harvest"
            ) : (
              "Growing..."
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SeedPod;