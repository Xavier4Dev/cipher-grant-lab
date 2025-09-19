// Environment configuration for Cipher Grant Lab
export const config = {
  chainId: 11155111, // Sepolia testnet
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || 'https://sepolia.infura.io/v3/YOUR_API_KEY',
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  infuraApiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY || 'YOUR_API_KEY',
  alternativeRpcUrl: 'https://1rpc.io/sepolia'
};

export default config;
