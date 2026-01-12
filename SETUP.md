# Aetheria NFT Marketplace - Quick Setup Guide

## 🎯 Prerequisites

- Node.js v16+ installed
- MetaMask browser extension
- Pinata account (free at pinata.cloud)

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies ✅

Already done! The `npm install` command has installed all required packages.

### Step 2: Configure Pinata (IPFS)

1. Go to https://pinata.cloud and create a free account
2. Get your API credentials from the account page
3. Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_PINATA_API_KEY=your_actual_api_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_actual_secret_key
NEXT_PUBLIC_PINATA_JWT=your_actual_jwt_token
```

### Step 3: Start Hardhat Local Blockchain

Open a terminal and run:

```bash
npm run hardhat:node
```

**Keep this terminal running!** It shows 20 test accounts with ETH.

You'll see output like:
```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
...
```

### Step 4: Deploy Smart Contract

In a **new terminal**, run:

```bash
npm run hardhat:deploy
```

You'll see:
```
NFTMarketplace deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Contract address and ABI saved to /config
```

### Step 5: Configure MetaMask

1. Open MetaMask
2. Click network dropdown → "Add Network" → "Add a network manually"
3. Fill in:
   - Network Name: `Hardhat Local`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `1337`
   - Currency Symbol: `ETH`
4. Click "Save"

5. Switch to this new network

6. Import a test account:
   - Click account icon → "Import Account"
   - Copy a private key from the Hardhat terminal (Account #0 or #1)
   - Paste and import

You now have 10,000 test ETH! 🎉

### Step 6: Start Frontend

In a **third terminal**, run:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Step 7: Connect & Test

1. Click "Connect Wallet" in the navbar
2. Approve the MetaMask connection
3. Navigate to "Mint" page
4. Upload an image, fill in details, and mint your first NFT!

## 🎨 What You Just Built

✅ **Smart Contract**: ERC721 NFT + Marketplace logic  
✅ **IPFS Storage**: Decentralized file storage  
✅ **Web3 Frontend**: Next.js with Ethers.js  
✅ **Cyber-Luxe UI**: Glassmorphism + Framer Motion animations  

## 🐛 Troubleshooting

### "Please install MetaMask"
- Install MetaMask extension for Chrome/Firefox
- Refresh the page after installation

### "Failed to upload to IPFS"
- Check your `.env` file has correct Pinata credentials
- Restart the dev server after adding `.env`

### "Transaction failed"
- Make sure you're on the Hardhat Local network
- Check you have enough ETH (should have 10,000)
- Ensure Hardhat node is still running

### Contract not found
- Run `npm run hardhat:deploy` to deploy the contract
- Check that `/config` folder was created with contract files

## 🚀 Next Steps

- **Mint NFTs**: Create your digital art collection
- **Test Buying**: Use different accounts to buy/sell
- **Customize UI**: Edit Tailwind theme in `tailwind.config.js`
- **Add Features**: Auctions, collections, user profiles
- **Deploy to Testnet**: Use Sepolia or Mumbai (see README.md)

## 📚 Key Files to Know

- `contracts/NFTMarketplace.sol` - Smart contract
- `context/NFTContext.js` - Web3 state management
- `app/page.js` - Home page
- `app/mint/page.js` - Mint page
- `components/NFTCard.jsx` - NFT display component
- `styles/globals.css` - Cyber-Luxe styling

## 💡 Pro Tips

1. **Use multiple accounts**: Import 2-3 accounts to test buying/selling
2. **Check console**: Open browser DevTools to see transaction logs
3. **Reset MetaMask**: If transactions get stuck, reset account in MetaMask settings
4. **Customize listing fee**: Update `listingPrice` in the smart contract

---

**Need help?** Check the README.md or open an issue on GitHub!

Happy minting! 🎨✨
