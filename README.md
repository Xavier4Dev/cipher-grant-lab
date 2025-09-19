# 🔐 Cipher Grant Lab

> **Revolutionary Privacy-Preserving Grant Management Platform**

Transform your grant management with cutting-edge FHE (Fully Homomorphic Encryption) technology. Experience the future of secure, private funding where sensitive data remains encrypted throughout the entire process.

## ✨ Key Innovations

- **🔒 Zero-Knowledge Grant Applications**: Submit proposals without revealing sensitive details
- **🛡️ Encrypted Review Process**: Reviewers score applications without seeing raw data  
- **⚡ Real-time Blockchain Integration**: Instant, secure transactions on Ethereum
- **🎯 Smart Contract Automation**: Automated funding distribution based on encrypted criteria
- **🌐 Multi-Wallet Support**: Connect with 300+ supported wallets

## 🚀 Technology Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS |
| **Web3** | RainbowKit, Wagmi, Viem, Ethers.js |
| **Blockchain** | Hardhat, Solidity 0.8.19, FHEVM |
| **Privacy** | Zama FHE, Homomorphic Encryption |
| **UI/UX** | shadcn/ui, Radix UI, Lucide Icons |

## 🛠️ Quick Start Guide

### 📋 Prerequisites

- **Node.js** 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- **npm** or **yarn** package manager
- **Git** for version control
- **MetaMask** or compatible Web3 wallet

### ⚡ Installation

```bash
# 1. Clone the repository
git clone https://github.com/Xavier4Dev/cipher-grant-lab.git
cd cipher-grant-lab

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your configuration

# 4. Start development server
npm run dev
```

### 🔧 Environment Configuration

Create `.env.local` with the following variables:

```env
# Blockchain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_API_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID
```

### 🚀 Smart Contract Deployment

```bash
# Compile contracts
npm run compile

# Deploy to Sepolia testnet
npm run deploy

# Run tests
npm run test
```

## 📁 Project Architecture

```
cipher-grant-lab/
├── 📁 contracts/              # Smart Contracts
│   ├── 🔐 CipherGrantLab.sol  # Main FHE Contract
│   └── 🪙 MockERC20.sol       # Test Token
├── 📁 scripts/                # Deployment Scripts
├── 📁 src/                    # Frontend Source
│   ├── 📁 components/         # UI Components
│   ├── 📁 pages/              # Application Pages
│   ├── 📁 lib/                # Utilities & Config
│   └── 📁 hooks/              # Custom React Hooks
└── 📄 Configuration Files
```

## 🔐 Smart Contract Features

### CipherGrantLab.sol - Core FHE Contract

| Feature | Description |
|---------|-------------|
| **🔒 Encrypted Data Storage** | All sensitive information encrypted using FHEVM |
| **👥 Role-Based Access** | Granular permissions for grantors and applicants |
| **🛡️ Security First** | Reentrancy protection and secure coding practices |
| **📊 Event Transparency** | Comprehensive logging for audit trails |
| **💰 Automated Funding** | Smart contract-based fund distribution |

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
