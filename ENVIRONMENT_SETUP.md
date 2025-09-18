# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Infura Configuration (Optional)
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia

# Private Key for Deployment (Optional)
PRIVATE_KEY=your_private_key_here
```

## Vercel Deployment Environment Variables

When deploying to Vercel, add these same variables in your Vercel project settings:

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add each variable with the values above
4. Make sure to select "Production", "Preview", and "Development" for each variable

## Important Notes

- Never commit your `.env.local` file to version control
- The `PRIVATE_KEY` is only needed for smart contract deployment
- Make sure all environment variables are prefixed with `NEXT_PUBLIC_` for client-side access
- Test your environment variables locally before deploying
