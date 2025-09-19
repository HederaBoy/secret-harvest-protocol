// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@zama-fhe/oracle-solidity/contracts/FHE.sol";
import "@zama-fhe/oracle-solidity/contracts/Reencrypt.sol";

/**
 * @title Secret Harvest Protocol
 * @dev A DeFi farming protocol that uses Fully Homomorphic Encryption (FHE) to keep yield rewards private
 * @author Secret Harvest Protocol Team
 */
contract SecretHarvestProtocol {
    using FHE for euint32;
    using FHE for euint64;
    using FHE for euint128;
    using FHE for euint256;

    // Events
    event FarmCreated(uint256 indexed farmId, address indexed creator, string name, address stakingToken);
    event Staked(uint256 indexed farmId, address indexed user, uint256 amount, euint256 encryptedRewards);
    event Unstaked(uint256 indexed farmId, address indexed user, uint256 amount);
    event RewardsClaimed(uint256 indexed farmId, address indexed user, uint256 amount);
    event FarmUpdated(uint256 indexed farmId, uint256 newAPY);

    // Structs
    struct Farm {
        uint256 id;
        string name;
        address stakingToken;
        address rewardToken;
        uint256 apy; // APY in basis points (10000 = 100%)
        uint256 totalStaked;
        uint256 totalRewards;
        bool isActive;
        address creator;
        uint256 createdAt;
    }

    struct UserStake {
        uint256 amount;
        euint256 encryptedRewards;
        uint256 lastUpdateTime;
        bool isActive;
    }

    // State variables
    mapping(uint256 => Farm) public farms;
    mapping(uint256 => mapping(address => UserStake)) public userStakes;
    mapping(address => uint256[]) public userFarms;
    
    uint256 public nextFarmId = 1;
    address public owner;
    uint256 public protocolFee = 250; // 2.5% in basis points
    address public feeRecipient;

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    modifier farmExists(uint256 farmId) {
        require(farmId > 0 && farmId < nextFarmId, "Farm does not exist");
        _;
    }

    modifier farmActive(uint256 farmId) {
        require(farms[farmId].isActive, "Farm is not active");
        _;
    }

    constructor(address _feeRecipient) {
        owner = msg.sender;
        feeRecipient = _feeRecipient;
    }

    /**
     * @dev Create a new farming pool
     * @param name Name of the farm
     * @param stakingToken Address of the token to stake
     * @param rewardToken Address of the reward token
     * @param apy APY in basis points
     */
    function createFarm(
        string memory name,
        address stakingToken,
        address rewardToken,
        uint256 apy
    ) external returns (uint256) {
        require(stakingToken != address(0), "Invalid staking token");
        require(rewardToken != address(0), "Invalid reward token");
        require(apy > 0 && apy <= 10000, "Invalid APY");

        uint256 farmId = nextFarmId++;
        
        farms[farmId] = Farm({
            id: farmId,
            name: name,
            stakingToken: stakingToken,
            rewardToken: rewardToken,
            apy: apy,
            totalStaked: 0,
            totalRewards: 0,
            isActive: true,
            creator: msg.sender,
            createdAt: block.timestamp
        });

        emit FarmCreated(farmId, msg.sender, name, stakingToken);
        return farmId;
    }

    /**
     * @dev Stake tokens in a farm (encrypted rewards calculation)
     * @param farmId ID of the farm
     * @param amount Amount to stake
     */
    function stake(uint256 farmId, uint256 amount) external farmExists(farmId) farmActive(farmId) {
        require(amount > 0, "Amount must be greater than 0");
        
        Farm storage farm = farms[farmId];
        
        // Transfer tokens from user to contract
        IERC20(farm.stakingToken).transferFrom(msg.sender, address(this), amount);
        
        // Calculate encrypted rewards using FHE
        euint256 encryptedRewards = calculateEncryptedRewards(farmId, amount);
        
        // Update user stake
        UserStake storage userStake = userStakes[farmId][msg.sender];
        if (userStake.isActive) {
            // Add to existing stake
            userStake.amount += amount;
            userStake.encryptedRewards = userStake.encryptedRewards + encryptedRewards;
        } else {
            // Create new stake
            userStake.amount = amount;
            userStake.encryptedRewards = encryptedRewards;
            userStake.isActive = true;
            userFarms[msg.sender].push(farmId);
        }
        
        userStake.lastUpdateTime = block.timestamp;
        
        // Update farm totals
        farm.totalStaked += amount;
        
        emit Staked(farmId, msg.sender, amount, encryptedRewards);
    }

    /**
     * @dev Unstake tokens from a farm
     * @param farmId ID of the farm
     * @param amount Amount to unstake
     */
    function unstake(uint256 farmId, uint256 amount) external farmExists(farmId) {
        UserStake storage userStake = userStakes[farmId][msg.sender];
        require(userStake.isActive, "No active stake");
        require(amount <= userStake.amount, "Insufficient stake");
        
        Farm storage farm = farms[farmId];
        
        // Update user stake
        userStake.amount -= amount;
        if (userStake.amount == 0) {
            userStake.isActive = false;
        }
        
        // Update farm totals
        farm.totalStaked -= amount;
        
        // Transfer tokens back to user
        IERC20(farm.stakingToken).transfer(msg.sender, amount);
        
        emit Unstaked(farmId, msg.sender, amount);
    }

    /**
     * @dev Claim encrypted rewards (only the user can decrypt)
     * @param farmId ID of the farm
     * @param encryptedRewards The encrypted rewards to claim
     * @param proof Proof of the encrypted rewards
     */
    function claimRewards(
        uint256 farmId,
        euint256 encryptedRewards,
        bytes calldata proof
    ) external farmExists(farmId) {
        UserStake storage userStake = userStakes[farmId][msg.sender];
        require(userStake.isActive, "No active stake");
        
        // Verify the encrypted rewards belong to the user
        require(verifyEncryptedRewards(farmId, msg.sender, encryptedRewards, proof), "Invalid rewards");
        
        // Calculate actual rewards (this would be done off-chain with FHE)
        uint256 actualRewards = calculateActualRewards(farmId, msg.sender);
        
        // Update user stake
        userStake.encryptedRewards = userStake.encryptedRewards - encryptedRewards;
        userStake.lastUpdateTime = block.timestamp;
        
        // Transfer rewards to user
        Farm storage farm = farms[farmId];
        IERC20(farm.rewardToken).transfer(msg.sender, actualRewards);
        
        emit RewardsClaimed(farmId, msg.sender, actualRewards);
    }

    /**
     * @dev Calculate encrypted rewards using FHE
     * @param farmId ID of the farm
     * @param amount Amount staked
     * @return encryptedRewards Encrypted rewards calculation
     */
    function calculateEncryptedRewards(uint256 farmId, uint256 amount) internal view returns (euint256) {
        Farm storage farm = farms[farmId];
        
        // Convert to encrypted values
        euint256 encryptedAmount = FHE.asEuint256(amount);
        euint256 encryptedAPY = FHE.asEuint256(farm.apy);
        
        // Calculate encrypted rewards: amount * apy / 10000
        euint256 encryptedRewards = (encryptedAmount * encryptedAPY) / FHE.asEuint256(10000);
        
        return encryptedRewards;
    }

    /**
     * @dev Verify encrypted rewards belong to user
     * @param farmId ID of the farm
     * @param user User address
     * @param encryptedRewards Encrypted rewards to verify
     * @param proof Proof of ownership
     * @return valid Whether the proof is valid
     */
    function verifyEncryptedRewards(
        uint256 farmId,
        address user,
        euint256 encryptedRewards,
        bytes calldata proof
    ) internal view returns (bool) {
        // This would implement FHE-based proof verification
        // For now, we'll use a simplified approach
        UserStake storage userStake = userStakes[farmId][user];
        return userStake.isActive && userStake.encryptedRewards >= encryptedRewards;
    }

    /**
     * @dev Calculate actual rewards (off-chain calculation)
     * @param farmId ID of the farm
     * @param user User address
     * @return rewards Actual rewards amount
     */
    function calculateActualRewards(uint256 farmId, address user) internal view returns (uint256) {
        UserStake storage userStake = userStakes[farmId][user];
        Farm storage farm = farms[farmId];
        
        uint256 timeElapsed = block.timestamp - userStake.lastUpdateTime;
        uint256 rewards = (userStake.amount * farm.apy * timeElapsed) / (365 days * 10000);
        
        return rewards;
    }

    /**
     * @dev Update farm APY (only by farm creator or owner)
     * @param farmId ID of the farm
     * @param newAPY New APY in basis points
     */
    function updateFarmAPY(uint256 farmId, uint256 newAPY) external farmExists(farmId) {
        Farm storage farm = farms[farmId];
        require(
            msg.sender == farm.creator || msg.sender == owner,
            "Not authorized to update farm"
        );
        require(newAPY > 0 && newAPY <= 10000, "Invalid APY");
        
        farm.apy = newAPY;
        emit FarmUpdated(farmId, newAPY);
    }

    /**
     * @dev Get user's farms
     * @param user User address
     * @return farmIds Array of farm IDs
     */
    function getUserFarms(address user) external view returns (uint256[] memory) {
        return userFarms[user];
    }

    /**
     * @dev Get farm details
     * @param farmId ID of the farm
     * @return farm Farm details
     */
    function getFarm(uint256 farmId) external view farmExists(farmId) returns (Farm memory) {
        return farms[farmId];
    }

    /**
     * @dev Get user stake in a farm
     * @param farmId ID of the farm
     * @param user User address
     * @return stake User stake details
     */
    function getUserStake(uint256 farmId, address user) external view returns (UserStake memory) {
        return userStakes[farmId][user];
    }

    /**
     * @dev Set protocol fee (only owner)
     * @param newFee New fee in basis points
     */
    function setProtocolFee(uint256 newFee) external onlyOwner {
        require(newFee <= 1000, "Fee too high"); // Max 10%
        protocolFee = newFee;
    }

    /**
     * @dev Set fee recipient (only owner)
     * @param newRecipient New fee recipient address
     */
    function setFeeRecipient(address newRecipient) external onlyOwner {
        require(newRecipient != address(0), "Invalid recipient");
        feeRecipient = newRecipient;
    }

    /**
     * @dev Emergency pause farm (only owner)
     * @param farmId ID of the farm
     */
    function pauseFarm(uint256 farmId) external onlyOwner farmExists(farmId) {
        farms[farmId].isActive = false;
    }

    /**
     * @dev Resume farm (only owner)
     * @param farmId ID of the farm
     */
    function resumeFarm(uint256 farmId) external onlyOwner farmExists(farmId) {
        farms[farmId].isActive = true;
    }
}

// Interface for ERC20 tokens
interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
}
