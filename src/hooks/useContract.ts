import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { useState } from 'react';

// Contract ABI for Secret Harvest Protocol
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "address", "name": "stakingToken", "type": "address"},
      {"internalType": "address", "name": "rewardToken", "type": "address"},
      {"internalType": "uint256", "name": "apy", "type": "uint256"}
    ],
    "name": "createFarm",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "farmId", "type": "uint256"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "stake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "farmId", "type": "uint256"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "unstake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "farmId", "type": "uint256"},
      {"internalType": "bytes", "name": "encryptedRewards", "type": "bytes"},
      {"internalType": "bytes", "name": "proof", "type": "bytes"}
    ],
    "name": "claimRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "farmId", "type": "uint256"}],
    "name": "getFarm",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256", "name": "id", "type": "uint256"},
          {"internalType": "string", "name": "name", "type": "string"},
          {"internalType": "address", "name": "stakingToken", "type": "address"},
          {"internalType": "address", "name": "rewardToken", "type": "address"},
          {"internalType": "uint256", "name": "apy", "type": "uint256"},
          {"internalType": "uint256", "name": "totalStaked", "type": "uint256"},
          {"internalType": "uint256", "name": "totalRewards", "type": "uint256"},
          {"internalType": "bool", "name": "isActive", "type": "bool"},
          {"internalType": "address", "name": "creator", "type": "address"},
          {"internalType": "uint256", "name": "createdAt", "type": "uint256"}
        ],
        "internalType": "struct SecretHarvestProtocol.Farm",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "farmId", "type": "uint256"},
      {"internalType": "address", "name": "user", "type": "address"}
    ],
    "name": "getUserStake",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256", "name": "amount", "type": "uint256"},
          {"internalType": "bytes", "name": "encryptedRewards", "type": "bytes"},
          {"internalType": "uint256", "name": "lastUpdateTime", "type": "uint256"},
          {"internalType": "bool", "name": "isActive", "type": "bool"}
        ],
        "internalType": "struct SecretHarvestProtocol.UserStake",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Contract address (replace with actual deployed contract address)
const CONTRACT_ADDRESS = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6' as const;

export const useSecretHarvest = () => {
  const { address, isConnected } = useAccount();
  const { writeContract, isPending, error } = useWriteContract();
  const [isLoading, setIsLoading] = useState(false);

  // Create a new farm
  const createFarm = async (
    name: string,
    stakingToken: string,
    rewardToken: string,
    apy: number
  ) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'createFarm',
        args: [name, stakingToken as `0x${string}`, rewardToken as `0x${string}`, BigInt(apy * 100)] // Convert to basis points
      });
      return hash;
    } catch (err) {
      console.error('Error creating farm:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Stake tokens in a farm
  const stakeTokens = async (farmId: number, amount: string) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'stake',
        args: [BigInt(farmId), parseEther(amount)]
      });
      return hash;
    } catch (err) {
      console.error('Error staking tokens:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Unstake tokens from a farm
  const unstakeTokens = async (farmId: number, amount: string) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'unstake',
        args: [BigInt(farmId), parseEther(amount)]
      });
      return hash;
    } catch (err) {
      console.error('Error unstaking tokens:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Claim encrypted rewards
  const claimRewards = async (
    farmId: number,
    encryptedRewards: string,
    proof: string
  ) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'claimRewards',
        args: [BigInt(farmId), encryptedRewards as `0x${string}`, proof as `0x${string}`]
      });
      return hash;
    } catch (err) {
      console.error('Error claiming rewards:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createFarm,
    stakeTokens,
    unstakeTokens,
    claimRewards,
    isLoading: isLoading || isPending,
    error,
    isConnected,
    address
  };
};

// Hook for reading contract data
export const useFarmData = (farmId: number) => {
  const { data: farmData, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getFarm',
    args: [BigInt(farmId)]
  });

  return {
    farmData,
    isLoading,
    error
  };
};

// Hook for reading user stake data
export const useUserStake = (farmId: number, userAddress?: string) => {
  const { address } = useAccount();
  const targetAddress = userAddress || address;

  const { data: stakeData, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getUserStake',
    args: targetAddress ? [BigInt(farmId), targetAddress] : undefined,
    query: {
      enabled: !!targetAddress
    }
  });

  return {
    stakeData,
    isLoading,
    error
  };
};
