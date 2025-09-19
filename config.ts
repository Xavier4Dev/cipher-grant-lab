// Environment configuration for Cipher Grant Lab
export const config = {
  chainId: 11155111, // Sepolia testnet
  rpcUrl: import.meta.env.VITE_RPC_URL || 'https://sepolia.infura.io/v3/YOUR_API_KEY',
  walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  infuraApiKey: import.meta.env.VITE_INFURA_API_KEY || 'YOUR_API_KEY',
  alternativeRpcUrl: 'https://1rpc.io/sepolia'
};

export default config;
