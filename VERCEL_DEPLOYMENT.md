# Vercel Deployment Guide for Cipher Grant Lab

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare the required environment variables

## Step-by-Step Deployment

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project" on your dashboard
3. Import your GitHub repository: `Xavier4Dev/cipher-grant-lab`

### Step 2: Configure Project Settings

1. **Framework Preset**: Select "Vite"
2. **Root Directory**: Leave as default (./)
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

### Step 3: Environment Variables Configuration

Add the following environment variables in Vercel dashboard:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

**How to add environment variables:**
1. In your Vercel project dashboard
2. Go to "Settings" tab
3. Click "Environment Variables"
4. Add each variable with its value
5. Make sure to select "Production", "Preview", and "Development" for each variable

### Step 4: Deploy

1. Click "Deploy" button
2. Wait for the build process to complete
3. Your application will be available at the provided Vercel URL

### Step 5: Custom Domain (Optional)

1. Go to "Domains" tab in your Vercel project
2. Add your custom domain
3. Configure DNS settings as instructed by Vercel

## Build Configuration

### Vercel Configuration File (vercel.json)

Create a `vercel.json` file in your project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "functions": {
    "app/api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check that all dependencies are in `package.json`
   - Ensure TypeScript compilation passes
   - Verify all imports are correct

2. **Environment Variables Not Working**:
   - Double-check variable names (case-sensitive)
   - Ensure variables are added to all environments
   - Redeploy after adding new variables

3. **Wallet Connection Issues**:
   - Verify WalletConnect Project ID is correct
   - Check RPC URL is accessible
   - Ensure chain ID matches your configuration

### Build Optimization

1. **Bundle Size**:
   - Use dynamic imports for large libraries
   - Optimize images and assets
   - Remove unused dependencies

2. **Performance**:
   - Enable Vercel's automatic optimizations
   - Use CDN for static assets
   - Implement proper caching strategies

## Post-Deployment

### Smart Contract Deployment

1. **Deploy to Sepolia Testnet**:
   ```bash
   npm run deploy
   ```

2. **Update Contract Addresses**:
   - Update contract addresses in your frontend
   - Redeploy to Vercel with new addresses

### Monitoring

1. **Vercel Analytics**: Enable in project settings
2. **Error Tracking**: Monitor build and runtime errors
3. **Performance**: Use Vercel's performance insights

## Security Considerations

1. **Environment Variables**: Never commit sensitive keys
2. **API Keys**: Use Vercel's environment variable system
3. **CORS**: Configure proper CORS settings for your domain
4. **HTTPS**: Vercel provides automatic HTTPS

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)

## Support

If you encounter issues during deployment:

1. Check Vercel's build logs
2. Verify all environment variables are set
3. Ensure your GitHub repository is properly connected
4. Contact Vercel support if needed

---

**Note**: This deployment guide assumes you have already set up your smart contracts and have the necessary API keys and configuration ready.
