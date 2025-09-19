# Vercel Deployment Guide for Secret Harvest Protocol

This guide provides step-by-step instructions for deploying the Secret Harvest Protocol to Vercel.

## Prerequisites

- Vercel account (free tier available)
- GitHub repository access
- Environment variables ready

## Step-by-Step Deployment

### 1. Prepare Your Repository

Ensure your code is pushed to GitHub:
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your repository: `HederaBoy/secret-harvest-protocol`

### 3. Configure Build Settings

Vercel will auto-detect this as a Vite project. Configure the following:

**Framework Preset**: Vite
**Root Directory**: `./` (default)
**Build Command**: `npm run build`
**Output Directory**: `dist`
**Install Command**: `npm install`

### 4. Set Environment Variables

In the Vercel dashboard, go to Settings > Environment Variables and add:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_rpc_url_here
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
NEXT_PUBLIC_INFURA_API_KEY=your_infura_api_key
```

**Note**: Replace the placeholder values with your actual API keys and configuration.

**Important**: Make sure to set these for all environments (Production, Preview, Development).

### 5. Configure Build Settings

In the Vercel dashboard:

1. Go to Settings > General
2. Set **Node.js Version**: 18.x
3. Set **Build Command**: `npm run build`
4. Set **Output Directory**: `dist`

### 6. Deploy

1. Click "Deploy" button
2. Wait for the build to complete (usually 2-3 minutes)
3. Your app will be available at `https://your-project-name.vercel.app`

### 7. Custom Domain (Optional)

1. Go to Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed by Vercel
4. Wait for SSL certificate to be issued

## Post-Deployment Configuration

### 1. Verify Environment Variables

Check that all environment variables are properly set:
- Go to your Vercel dashboard
- Navigate to Settings > Environment Variables
- Ensure all variables are present and correct

### 2. Test Wallet Connection

1. Open your deployed app
2. Click "Connect Wallet"
3. Test with MetaMask or other supported wallets
4. Verify Sepolia network connection

### 3. Test Smart Contract Interaction

1. Ensure you're on Sepolia testnet
2. Have some test ETH for gas fees
3. Test staking functionality (if contracts are deployed)

## Troubleshooting

### Common Issues

**Build Fails with "Module not found"**
- Ensure all dependencies are in package.json
- Check that package-lock.json is committed
- Try clearing Vercel cache and redeploying
- **Fixed**: Removed lovable-tagger dependency from vite.config.ts

**Build Fails with "lovable-tagger" Error**
- This has been fixed in the latest commit
- The vite.config.ts file no longer references lovable-tagger
- If you still see this error, ensure you're using the latest code

**Environment Variables Not Working**
- Verify variables are set for the correct environment
- Check for typos in variable names
- Ensure variables start with `NEXT_PUBLIC_` for client-side access

**Wallet Connection Issues**
- Verify WalletConnect Project ID is correct
- Check RPC URL is accessible
- Ensure chain ID matches Sepolia (11155111)

**Build Timeout**
- Optimize bundle size by removing unused dependencies
- Consider using Vercel Pro for longer build times
- Check for infinite loops in build process

### Performance Optimization

1. **Enable Vercel Analytics** (optional)
   - Go to Settings > Analytics
   - Enable Web Analytics

2. **Configure Caching**
   - Add `vercel.json` for custom caching rules
   - Optimize static assets

3. **Monitor Performance**
   - Use Vercel's built-in performance monitoring
   - Check Core Web Vitals

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive keys to repository
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **Smart Contract Security**
   - Deploy contracts to testnet first
   - Conduct security audits
   - Use multi-signature wallets for admin functions

3. **Frontend Security**
   - Validate all user inputs
   - Implement proper error handling
   - Use HTTPS only

## Monitoring and Maintenance

### 1. Set Up Monitoring

- Enable Vercel Analytics
- Set up error tracking (Sentry recommended)
- Monitor wallet connection success rates

### 2. Regular Updates

- Keep dependencies updated
- Monitor for security vulnerabilities
- Test after each deployment

### 3. Backup Strategy

- Repository is automatically backed up on GitHub
- Consider backing up environment variables
- Document all configuration changes

## Support and Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vite Documentation**: [vitejs.dev](https://vitejs.dev)
- **RainbowKit Documentation**: [rainbowkit.com](https://rainbowkit.com)
- **Wagmi Documentation**: [wagmi.sh](https://wagmi.sh)

## Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Environment variables configured
- [ ] Build settings verified
- [ ] Initial deployment successful
- [ ] Wallet connection tested
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled (optional)
- [ ] Performance monitoring set up
- [ ] Documentation updated

---

**Deployment completed successfully!** 🎉

Your Secret Harvest Protocol is now live and ready for users to start farming with privacy-preserving FHE technology.
