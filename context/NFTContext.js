'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { uploadFileToIPFS, createNFTMetadata } from '../utils/ipfs';

// Contract configuration
// After deployment, the contract address is: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

// Import ABI directly
import contractArtifact from '../config/NFTMarketplace.json';
const contractABI = contractArtifact.abi;

const NFTContext = createContext();

export const useNFT = () => {
    const context = useContext(NFTContext);
    if (!context) {
        throw new Error('useNFT must be used within NFTProvider');
    }
    return context;
};

export const NFTProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Check if MetaMask is installed
    const checkIfWalletIsConnected = async () => {
        try {
            if (!window.ethereum) {
                console.log('Please install MetaMask');
                return;
            }

            const accounts = await window.ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                await setupContract(accounts[0]);
            }
        } catch (error) {
            console.error('Error checking wallet connection:', error);
        }
    };

    // Switch to Hardhat network automatically
    const switchToHardhatNetwork = async () => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x539' }], // 1337 in hex
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0x539',
                            chainName: 'Hardhat Local',
                            rpcUrls: ['http://127.0.0.1:8545'],
                            nativeCurrency: {
                                name: 'ETH',
                                symbol: 'ETH',
                                decimals: 18
                            }
                        }],
                    });
                } catch (addError) {
                    console.error('Error adding Hardhat network:', addError);
                    throw addError;
                }
            } else {
                throw switchError;
            }
        }
    };

    // Setup contract instance
    const setupContract = async (account) => {
        if (!contractAddress || !contractABI) {
            console.warn('Contract not deployed. Deploy the contract first.');
            return;
        }

        try {
            // Auto-switch to Hardhat network
            await switchToHardhatNetwork();

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner(account);
            const nftContract = new ethers.Contract(contractAddress, contractABI, signer);
            setContract(nftContract);
        } catch (error) {
            console.error('Error setting up contract:', error);
        }
    };

    // Connect wallet
    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                alert('Please install MetaMask!');
                return;
            }

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
            await setupContract(accounts[0]);

            return accounts[0];
        } catch (error) {
            console.error('Error connecting wallet:', error);
            setError('Failed to connect wallet');
            throw error;
        }
    };

    // Disconnect wallet
    const disconnectWallet = () => {
        setCurrentAccount('');
        setContract(null);
    };

    // Create NFT (upload to IPFS and mint)
    const createNFT = async (formInput) => {
        const { name, description, price, fileUrl } = formInput;

        if (!name || !description || !price || !fileUrl) {
            throw new Error('Please provide all required fields');
        }

        setIsLoading(true);
        setError(null);

        try {
            // Create and upload metadata to IPFS
            const metadataURL = await createNFTMetadata(name, description, fileUrl);
            console.log('Metadata uploaded to:', metadataURL);

            // Get listing price
            const listingPrice = await contract.getListingPrice();
            const priceInWei = ethers.utils.parseUnits(price, 'ether');

            // Create token on blockchain
            const transaction = await contract.createToken(metadataURL, priceInWei, {
                value: listingPrice.toString(),
            });

            await transaction.wait();
            console.log('NFT created successfully!');

            return transaction;
        } catch (error) {
            console.error('Error creating NFT:', error);
            setError('Failed to create NFT');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // Buy NFT
    const buyNFT = async (nft) => {
        setIsLoading(true);
        setError(null);

        try {
            const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');

            const transaction = await contract.executeSale(nft.tokenId, {
                value: price,
            });

            await transaction.wait();
            console.log('NFT purchased successfully!');

            return transaction;
        } catch (error) {
            console.error('Error buying NFT:', error);
            setError('Failed to purchase NFT');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch all market items
    const fetchNFTs = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await contract.fetchMarketItems();
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const items = await Promise.all(
                data.map(async (item) => {
                    const tokenURI = await contract.tokenURI(item.tokenId);
                    const meta = await fetch(tokenURI).then((res) => res.json());

                    const price = ethers.utils.formatUnits(item.price.toString(), 'ether');

                    return {
                        price,
                        tokenId: item.tokenId.toNumber(),
                        seller: item.seller,
                        owner: item.owner,
                        image: meta.image,
                        name: meta.name,
                        description: meta.description,
                        tokenURI,
                    };
                })
            );

            return items;
        } catch (error) {
            console.error('Error fetching NFTs:', error);
            setError('Failed to fetch NFTs');
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch user's NFTs
    const fetchMyNFTs = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await contract.fetchMyNFTs();

            const items = await Promise.all(
                data.map(async (item) => {
                    const tokenURI = await contract.tokenURI(item.tokenId);
                    const meta = await fetch(tokenURI).then((res) => res.json());

                    const price = ethers.utils.formatUnits(item.price.toString(), 'ether');

                    return {
                        price,
                        tokenId: item.tokenId.toNumber(),
                        seller: item.seller,
                        owner: item.owner,
                        image: meta.image,
                        name: meta.name,
                        description: meta.description,
                        tokenURI,
                    };
                })
            );

            return items;
        } catch (error) {
            console.error('Error fetching my NFTs:', error);
            setError('Failed to fetch your NFTs');
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch NFTs created by user
    const fetchCreatedNFTs = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await contract.fetchItemsCreated();

            const items = await Promise.all(
                data.map(async (item) => {
                    const tokenURI = await contract.tokenURI(item.tokenId);
                    const meta = await fetch(tokenURI).then((res) => res.json());

                    const price = ethers.utils.formatUnits(item.price.toString(), 'ether');

                    return {
                        price,
                        tokenId: item.tokenId.toNumber(),
                        seller: item.seller,
                        owner: item.owner,
                        image: meta.image,
                        name: meta.name,
                        description: meta.description,
                        tokenURI,
                        sold: item.sold,
                    };
                })
            );

            return items;
        } catch (error) {
            console.error('Error fetching created NFTs:', error);
            setError('Failed to fetch created NFTs');
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    // Upload image to IPFS
    const uploadImage = async (file) => {
        setIsLoading(true);
        setError(null);

        try {
            const imageUrl = await uploadFileToIPFS(file);
            return imageUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            setError('Failed to upload image');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();

        // Listen for account changes
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    setCurrentAccount(accounts[0]);
                    setupContract(accounts[0]);
                } else {
                    disconnectWallet();
                }
            });

            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            });
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeAllListeners('accountsChanged');
                window.ethereum.removeAllListeners('chainChanged');
            }
        };
    }, []);

    const value = {
        currentAccount,
        contract,
        isLoading,
        error,
        connectWallet,
        disconnectWallet,
        createNFT,
        buyNFT,
        fetchNFTs,
        fetchMyNFTs,
        fetchCreatedNFTs,
        uploadImage,
    };

    return <NFTContext.Provider value={value}>{children}</NFTContext.Provider>;
};
