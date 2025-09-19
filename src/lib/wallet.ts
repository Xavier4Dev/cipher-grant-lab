import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

// Use a default project ID for demo purposes
const projectId = '2ec9743d0d0cd7fb94dee1a7e6d33475';

// Create configuration with error handling
let rainbowKitConfig;
let wagmiConfig;

try {
  rainbowKitConfig = getDefaultConfig({
    appName: 'Cipher Grant Lab',
    projectId: projectId,
    chains: [sepolia],
    ssr: false,
  });
  
  wagmiConfig = rainbowKitConfig.wagmiConfig;
} catch (error) {
  console.error('Error creating wallet configuration:', error);
  // Create a minimal fallback configuration
  rainbowKitConfig = {
    wagmiConfig: {
      chains: [sepolia],
      transports: {},
    }
  };
  wagmiConfig = rainbowKitConfig.wagmiConfig;
}

export { rainbowKitConfig, wagmiConfig };
