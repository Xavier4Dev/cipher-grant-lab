# Cipher Grant Lab

A privacy-preserving grant management platform built with FHE (Fully Homomorphic Encryption) technology. This platform enables secure, private grant applications and reviews while maintaining data confidentiality.

## Features

- **Privacy-First Design**: All sensitive data is encrypted using FHE technology
- **Wallet Integration**: Seamless connection with popular Web3 wallets via RainbowKit
- **Grant Management**: Create, apply for, and manage grants with encrypted data
- **Secure Reviews**: Review applications with privacy-preserving scoring
- **Blockchain Integration**: Built on Ethereum Sepolia testnet

## Technologies

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Web3**: RainbowKit, Wagmi, Viem
- **Blockchain**: Hardhat, Solidity
- **Privacy**: FHEVM, Zama FHE
- **Styling**: Tailwind CSS, Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Xavier4Dev/cipher-grant-lab.git
cd cipher-grant-lab
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit the environment variables
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/your-api-key
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your-project-id
```

4. Start the development server:
```bash
npm run dev
```

### Smart Contract Deployment

1. Compile contracts:
```bash
npm run compile
```

2. Deploy to Sepolia testnet:
```bash
npm run deploy
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Application pages
├── lib/                # Utility functions and configurations
├── hooks/              # Custom React hooks
contracts/              # Smart contracts
├── CipherGrantLab.sol  # Main FHE contract
├── MockERC20.sol       # Test token contract
scripts/                # Deployment scripts
```

## Smart Contracts

### CipherGrantLab.sol
The main contract implementing FHE-encrypted grant management:
- Encrypted grant creation and management
- Private application submissions
- Secure review and approval process
- Token-based funding system

### Key Features
- **FHE Encryption**: All sensitive data encrypted using FHEVM
- **Access Control**: Role-based permissions for grantors and applicants
- **Reentrancy Protection**: Secure against common attack vectors
- **Event Logging**: Comprehensive event system for transparency

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run compile` - Compile smart contracts
- `npm run test` - Run contract tests
- `npm run deploy` - Deploy contracts to network

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions and support, please open an issue on GitHub.
