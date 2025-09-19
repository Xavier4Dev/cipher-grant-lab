import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

// Use a default project ID for demo purposes
const projectId = '2ec9743d0d0cd7fb94dee1a7e6d33475';

export const rainbowKitConfig = getDefaultConfig({
  appName: 'Cipher Grant Lab',
  projectId: projectId,
  chains: [sepolia],
  ssr: false,
});

export const wagmiConfig = rainbowKitConfig.wagmiConfig;
