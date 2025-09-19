# Secret Harvest Protocol

A revolutionary DeFi farming protocol that uses Fully Homomorphic Encryption (FHE) to keep yield rewards completely private. Farmers can stake their assets and earn rewards while maintaining complete privacy over their earnings until they choose to claim them.

## Features

- **Private Rewards**: Yield calculations happen in encrypted space using FHE
- **Quantum Secure**: Built on cutting-edge cryptography that remains secure against quantum computers
- **Maximum Yield**: Optimized protocols deliver industry-leading APYs while maintaining privacy
- **Real Wallet Integration**: Connect with MetaMask, WalletConnect, and other popular wallets
- **Multi-Chain Support**: Deployed on Sepolia testnet with plans for mainnet expansion

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for component library
- **RainbowKit** for wallet connection
- **Wagmi** for Ethereum interactions
- **Viem** for low-level Ethereum operations

### Smart Contracts
- **Solidity 0.8.19** with FHE integration
- **Hardhat** for development and testing
- **@zama-fhe/oracle-solidity** for FHE operations
- **Sepolia Testnet** deployment

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- A Web3 wallet (MetaMask recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/HederaBoy/secret-harvest-protocol.git
cd secret-harvest-protocol
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file with the following variables:
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Smart Contract Development

1. Install Hardhat dependencies:
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

2. Compile contracts:
```bash
npx hardhat compile
```

3. Run tests:
```bash
npx hardhat test
```

4. Deploy to Sepolia:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## How It Works

1. **Staking**: Users stake their tokens in encrypted farming pools
2. **Encrypted Rewards**: Yield calculations happen in encrypted space using FHE
3. **Private Accumulation**: Rewards accumulate privately, visible only to the farmer
4. **Secure Claiming**: Only the farmer can decrypt and claim their rewards

## Security Features

- **Fully Homomorphic Encryption**: All reward calculations are performed on encrypted data
- **Zero-Knowledge Proofs**: Verify rewards without revealing amounts
- **Quantum Resistance**: Secure against future quantum computer attacks
- **Audited Contracts**: Smart contracts undergo rigorous security audits

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Documentation**: [docs.secretharvest.io](https://docs.secretharvest.io)
- **Discord**: [discord.gg/secretharvest](https://discord.gg/secretharvest)
- **Twitter**: [@SecretHarvest](https://twitter.com/SecretHarvest)
- **GitHub Issues**: [Report bugs and request features](https://github.com/HederaBoy/secret-harvest-protocol/issues)

## Roadmap

- [ ] Mainnet deployment
- [ ] Additional FHE operations
- [ ] Mobile app development
- [ ] Cross-chain support
- [ ] Advanced privacy features

---

**Built with ❤️ by the Secret Harvest Protocol team**
