'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNFT } from '../../context/NFTContext';
import NFTCard from '../../components/NFTCard';
import Loader from '../../components/Loader';
import { FaChartLine, FaPaintBrush, FaEthereum } from 'react-icons/fa';

export default function DashboardPage() {
    const { fetchCreatedNFTs, isLoading, currentAccount } = useNFT();
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalCreated: 0,
        totalSold: 0,
        totalRevenue: 0,
        listed: 0,
    });

    useEffect(() => {
        loadCreatedNFTs();
    }, [currentAccount]);

    const loadCreatedNFTs = async () => {
        if (!currentAccount) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const items = await fetchCreatedNFTs();
            setNfts(items);

            // Calculate stats
            const totalCreated = items.length;
            const totalSold = items.filter((nft) => nft.sold).length;
            const listed = items.filter((nft) => !nft.sold).length;
            const totalRevenue = items
                .filter((nft) => nft.sold)
                .reduce((sum, nft) => sum + parseFloat(nft.price), 0);

            setStats({ totalCreated, totalSold, totalRevenue, listed });
        } catch (error) {
            console.error('Error loading NFTs:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading || isLoading) {
        return <Loader message="Loading Dashboard..." />;
    }

    if (!currentAccount) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center glass-dark rounded-2xl p-12 max-w-md"
                >
                    <div className="text-6xl mb-6">🔐</div>
                    <h2 className="text-3xl font-bold gradient-text mb-4">
                        Connect Your Wallet
                    </h2>
                    <p className="text-gray-400">
                        Please connect your wallet to view your creator dashboard
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <h1 className="text-5xl font-display font-bold mb-4">
                    <span className="gradient-text">Creator</span> Dashboard
                </h1>
                <p className="text-gray-400 text-lg">
                    Track your NFT creations and sales performance
                </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            >
                {[
                    {
                        label: 'Total Created',
                        value: stats.totalCreated,
                        icon: <FaPaintBrush />,
                        color: 'cyber-cyan',
                    },
                    {
                        label: 'Total Sold',
                        value: stats.totalSold,
                        icon: <FaChartLine />,
                        color: 'cyber-purple',
                    },
                    {
                        label: 'Currently Listed',
                        value: stats.listed,
                        icon: <FaChartLine />,
                        color: 'cyber-magenta',
                    },
                    {
                        label: 'Total Revenue',
                        value: `${stats.totalRevenue.toFixed(2)} ETH`,
                        icon: <FaEthereum />,
                        color: 'cyber-cyan',
                    },
                ].map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="glass-dark rounded-xl p-6 hover:scale-105 transition-transform duration-300"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`text-2xl text-${stat.color}`}>{stat.icon}</div>
                            <div className={`w-10 h-10 rounded-lg bg-gradient-cyber opacity-20`} />
                        </div>
                        <div className="text-3xl font-bold gradient-text mb-1">
                            {stat.value}
                        </div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                ))}
            </motion.div>

            {/* NFTs Grid */}
            {nfts.length > 0 ? (
                <div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mb-6"
                    >
                        <h2 className="text-2xl font-bold gradient-text">Your Creations</h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {nfts.map((nft, index) => (
                            <motion.div
                                key={`${nft.tokenId}-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                            >
                                <NFTCard nft={nft} showBuyButton={false} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                >
                    <div className="glass-dark rounded-2xl p-12 max-w-md mx-auto">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-6xl mb-6"
                        >
                            🎨
                        </motion.div>
                        <h3 className="text-2xl font-bold mb-4 gradient-text">
                            No NFTs Created Yet
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Start your creator journey by minting your first NFT
                        </p>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="/mint"
                            className="btn-primary inline-flex items-center space-x-2"
                        >
                            <FaPaintBrush />
                            <span>Create NFT</span>
                        </motion.a>
                    </div>
                </motion.div>
            )}

            {/* Performance Chart Placeholder */}
            {nfts.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-16 glass-dark rounded-2xl p-8"
                >
                    <h3 className="text-2xl font-bold gradient-text mb-6">
                        Sales Performance
                    </h3>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-xl">
                        <p className="text-gray-500">Chart visualization coming soon</p>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
