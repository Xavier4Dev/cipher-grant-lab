import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { config } from '../../config';

export const rainbowKitConfig = getDefaultConfig({
  appName: 'Cipher Grant Lab',
  projectId: config.walletConnectProjectId,
  chains: [sepolia],
  ssr: false,
});

export const wagmiConfig = rainbowKitConfig.wagmiConfig;
