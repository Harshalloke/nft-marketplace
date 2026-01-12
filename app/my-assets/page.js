'use client';

import React, { useState, useEffect } from 'react';
import { useNFT } from '../../context/NFTContext';
import NFTCard from '../../components/NFTCard';
import Loader from '../../components/Loader';

export default function MyAssetsPage() {
    const { fetchMyNFTs, isLoading, currentAccount, contract } = useNFT();
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMyNFTs();
    }, [currentAccount, contract]);

    const loadMyNFTs = async () => {
        if (!currentAccount || !contract) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const items = await fetchMyNFTs();
            setNfts(items);
        } catch (error) {
            console.error('ASSET_RETRIEVAL_FAILED:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading || isLoading) {
        return <Loader message="ACCESSING_USER_ARCHIVE..." />;
    }

    if (!currentAccount) {
        return (
            <div className="min-h-screen pt-40 px-8 flex justify-center">
                <div className="bg-accent border-4 border-primary p-12 text-primary shadow-[12px_12px_0px_0px_white] max-w-xl text-center">
                    <h2 className="text-5xl font-black uppercase mb-6 leading-none">AUTHENTICATION_REQUIRED</h2>
                    <p className="font-mono font-black uppercase tracking-widest text-sm bg-primary text-white p-4">
                        System requires decentralized identifier to proceed
                    </p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen pt-28 pb-20 px-8">
            <div className="max-w-[1600px] mx-auto">
                {/* Collection Header */}
                <div className="border-4 border-secondary bg-gray-dark p-12 flex flex-col md:flex-row justify-between items-end mb-16 shadow-[10px_10px_0px_0px_#7C3AED]">
                    <div>
                        <span className="bg-secondary text-primary px-3 py-0.5 font-mono text-[10px] font-black uppercase mb-4 inline-block">Directory: ~/home/user/vault</span>
                        <h1 className="text-6xl md:text-8xl font-black text-secondary leading-[0.8] uppercase tracking-tighter">
                            Authorized <span className="text-outline">Collection</span>
                        </h1>
                    </div>
                    <div className="mt-8 md:mt-0 text-right">
                        <div className="text-[10px] font-mono text-gray-400 font-bold uppercase mb-2">Total_Storage_Units</div>
                        <div className="text-6xl font-black text-secondary font-mono leading-none">{nfts.length}</div>
                    </div>
                </div>

                {nfts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                        {nfts.map((nft, index) => (
                            <div key={`${nft.tokenId}-${index}`}>
                                <NFTCard nft={nft} showBuyButton={false} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="border-4 border-secondary p-24 bg-primary flex flex-col items-center">
                        <h3 className="text-4xl font-black text-gray-400 uppercase mb-8">Archive_Is_Empty</h3>
                        <a
                            href="/"
                            className="bg-secondary text-primary px-8 py-4 font-black uppercase border-2 border-primary shadow-[6px_6px_0px_0px_#7C3AED] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                        >
                            Navigate_To_Marketplace
                        </a>
                    </div>
                )}

                {/* Metadata Summary */}
                {nfts.length > 0 && (
                    <div className="mt-20 border-t-4 border-secondary pt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-mid p-6 border-2 border-secondary">
                            <span className="block text-[10px] font-mono text-gray-400 font-black uppercase mb-2">Total_Net_Valuation</span>
                            <span className="text-3xl font-black text-secondary font-mono">
                                {nfts.reduce((sum, nft) => sum + parseFloat(nft.price), 0).toFixed(2)} ETH
                            </span>
                        </div>
                        <div className="bg-gray-mid p-6 border-2 border-secondary">
                            <span className="block text-[10px] font-mono text-gray-400 font-black uppercase mb-2">Avg_Unit_Cost</span>
                            <span className="text-3xl font-black text-secondary font-mono">
                                {(nfts.reduce((sum, nft) => sum + parseFloat(nft.price), 0) / nfts.length).toFixed(2)} ETH
                            </span>
                        </div>
                        <div className="bg-accent p-6 border-2 border-primary shadow-[6px_6px_0px_0px_white]">
                            <span className="block text-[10px] font-mono text-primary font-black uppercase mb-2">Vault_Health</span>
                            <span className="text-3xl font-black text-primary font-mono select-none uppercase">Optimized</span>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
