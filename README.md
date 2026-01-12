# AETHERIA_v2: Brutalist NFT Protocol 💜

A high-end, **Industrial Brutalist** NFT marketplace built with the Next.js 14 App Router and Solidity. Optimized for institutional-grade digital asset tokenization with a stark, premium minimal aesthetic.

![Aetheria Hero Display](/assets/img/hero_nft_brutalist_purple_1768229647485.png)

## 📐 Design Philosophy: Brutalism v2.0
- **Stark Contrast**: Deep black, absolute white, and sharp purple (#7C3AED).
- **Industrial Precision**: Blueprint grids, technical crosshairs, and measurement markings.
- **Raw Interactions**: No soft fades. Glitch hovers, snap-entry animations, and CRT scanlines.
- **Information Density**: Real-time system clocks and technical metadata marquees.

## ✨ System Features
- 🚀 **One-Time Preloader**: Bespoke industrial initialization sequence.
- 🎯 **Technical Cursor**: Mouse-following crosshair with real-time X/Y coordinates.
- �️ **Asset Serialization**: Professional minting flow with IPFS/Pinata redundancy.
- � **Blockchain Exchange**: Secure P2P settlement via smart contract escrow.
- 📂 **Authorized Collection**: Personalized vault for managing owned digital blocks.
- 📡 **System Monitoring**: Live-flickering status indicators and dynamic log console.

## 🚀 Tech Stack
- **Next.js 14** (App Router & Server-side optimization)
- **Solidity 0.8.4+** (ERC721 Standard)
- **Hardhat** (Local Blockchain Engineering)
- **Ethers.js v5** (Web3 Data Stream)
- **Tailwind CSS** (Custom Brutalist Design System)
- **Framer Motion** (Industrial Snap Animations)

---

## 🛠️ Execution Protocol (Step-by-Step)

Follow these directions precisely to initialize the Aetheria Environment.

### 1. Repository Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd nft-marketplace

# Initialize dependencies
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory and input your Pinata credentials:
```env
NEXT_PUBLIC_PINATA_API_KEY=your_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_secret
NEXT_PUBLIC_PINATA_JWT=your_jwt
```
*Note: Get keys at [pinata.cloud](https://pinata.cloud)*

### 3. Initialize Local Blockchain
In your first terminal, start the Hardhat node:
```bash
npx hardhat node
```
*Keep this terminal running. It creates 20 test accounts.*

### 4. Deploy Smart Contract
In a second terminal, execute the deployment script:
```bash
npx hardhat run scripts/deploy.js --network localhost
```
**CRITICAL:** After deployment, the terminal will output the **Contract Address**. 
- Copy this address.
- Open `context/NFTContext.js`.
- Update the `contractAddress` variable on **Line 9** with your new address.

### 5. Configure MetaMask
Connect your wallet to the local blockchain:
- **Network Name**: Hardhat Local
- **RPC URL**: `http://127.0.0.1:8545`
- **Chain ID**: `1337` (or `31337` depending on version)
- **Currency**: `ETH`

**Import Account**: Copy a private key from the `npx hardhat node` terminal and import it into MetaMask.

### 6. Launch Protocol
Finalize by starting the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 📂 Protocol Structure
```
├── app/                 # System Pages (Index, Mint, Vault)
├── components/          # Brutalist UI Modules (Navbar, NFTCard, Preloader)
├── context/             # NFTContext (Web3 State Engine)
├── contracts/           # NFTMarketplace.sol (Core Logic)
├── public/assets/img/   # Industrial Media Assets
├── styles/globals.css   # Brutalist Design Tokens & Keyframes
└── tailwind.config.js   # Custom Theme Configuration
```

## � Smart Contract Manifest
- `createToken`: Serializes new assets to the blockchain.
- `executeSale`: Settles P2P ownership transfer.
- `fetchMarketItems`: Indexes all available registry blocks.
- `fetchMyNFTs`: Authorizes and retrieves user-owned assets.

## 🤝 Support & Contribution
This protocol is open for enhancement. If you identify structural flaws or optimization opportunities, open a technical ticket (Issue) or submit a protocol patch (PR).

---
**AETHERIA_SYSTEM_v2.0** // *Brutalism. Blockchain. Bespoke.*
Built for the future of digital asset engineering.
