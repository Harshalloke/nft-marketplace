'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useNFT } from '../context/NFTContext';
import NFTCard from '../components/NFTCard';
import Loader from '../components/Loader';

const SYSTEM_LOGS = [
    "> INITIALIZING_AETHERIA_PROTOCOL...",
    "> SYNCING_BLOCKED_NETWORK_STATE...",
    "> LOADING_ASSET_MANIFEST...",
    "> VERIFYING_DECENTRALIZED_CONSENSUS...",
    "> SYSTEM_STABLE_v2.0.4",
    "> MONITORING_P2P_HANDSHAKES...",
    "> BUFFERING_METADATA_PACKETS..."
];

export default function Home() {
    const { fetchNFTs, buyNFT, isLoading, currentAccount } = useNFT();
    const [nfts, setNfts] = useState([]);
    const [purchasing, setPurchasing] = useState(false);
    const [logs, setLogs] = useState(SYSTEM_LOGS);

    useEffect(() => {
        loadNFTs();
        const interval = setInterval(() => {
            setLogs(prev => [...prev.slice(1), `> LOG_${Math.random().toString(16).slice(2, 8).toUpperCase()}_DETECTED_AT_BLOCK_${Math.floor(Math.random() * 10000)}`]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const loadNFTs = async () => {
        try {
            const items = await fetchNFTs();
            setNfts(items);
        } catch (error) {
            console.error('Error loading NFTs:', error);
        }
    };

    const handleBuyNFT = async (nft) => {
        if (!currentAccount) {
            alert('WALLET_REJECTED: PLEASE_INITIALIZE_AUTHENTICATION');
            return;
        }
        try {
            setPurchasing(true);
            await buyNFT(nft);
            await loadNFTs();
        } catch (error) {
            console.error('TRANSACTION_FAILURE:', error);
        } finally {
            setPurchasing(false);
        }
    };

    if (isLoading || purchasing) {
        return <Loader message={purchasing ? 'SETTLING_BLOCKCHAIN_STATE...' : 'STAGING_DIGITAL_ASSETS...'} />;
    }

    return (
        <main className="min-h-screen">
            {/* Header / Hero */}
            <section className="border-b-4 border-secondary relative">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[70vh]">
                    {/* Main Banner */}
                    <div className="lg:col-span-8 p-8 md:p-16 flex flex-col justify-center relative z-20">
                        {/* Decorative Coordinate */}
                        <div className="absolute top-4 left-4 font-mono text-[9px] text-gray-mid font-black">
                            LOC: 40.7128 | NODE: 0x8545
                        </div>

                        <div className="mb-4">
                            <div className="inline-block bg-accent px-2 py-0.5 text-[10px] font-mono font-black border border-primary text-primary animate-flicker">
                                SYSTEM_SYNC_ACTIVE
                            </div>
                        </div>

                        <h1 className="text-6xl md:text-[10rem] font-black leading-[0.75] uppercase tracking-tighter mb-12 animate-glitch cursor-default">
                            Aetheria<br />
                            <span className="text-outline">System</span>.
                        </h1>

                        <div className="flex flex-col md:flex-row gap-8 items-start animate-snap-up">
                            <div className="max-w-md">
                                <p className="text-lg font-mono font-black uppercase leading-[1.1] border-l-4 border-accent pl-4 text-gray-mid">
                                    Bespoke tokens. Hard engineering. The premier protocol for high-value decentralized assets.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <a href="/mint" className="btn-brutal text-center leading-none flex items-center">CREATE_TOKEN</a>
                                <a href="#explore" className="btn-brutal-outline text-center leading-none flex items-center">EXPLORE_CATALOG</a>
                            </div>
                        </div>
                    </div>

                    {/* Image / Console Panel */}
                    <div className="lg:col-span-4 flex flex-col border-l-4 border-secondary">
                        <div className="flex-grow relative overflow-hidden group bg-gray-dark border-b-4 border-secondary">
                            <Image
                                src="/assets/img/hero_nft_brutalist_purple_1768229647485.png"
                                alt="Aetheria System Hero"
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 contrast-125"
                            />
                            <div className="absolute inset-0 border-[20px] border-primary pointer-events-none" />
                            <div className="absolute bottom-4 left-4 bg-primary text-secondary p-2 font-mono text-[8px] font-black uppercase border border-secondary shadow-brutal-accent">
                                SYSTEM_CORE_MANIFEST_V1
                            </div>
                        </div>

                        <div className="h-64 bg-gray-dark p-6 flex flex-col">
                            <h2 className="text-sm font-black mb-4 uppercase flex justify-between">
                                <span>SYSTEM_LOGS_STREAM</span>
                                <span className="animate-flicker text-accent">[●]</span>
                            </h2>
                            <div className="font-mono text-[9px] space-y-1 text-neon-green overflow-hidden">
                                {logs.map((log, i) => (
                                    <div key={i} className={i === logs.length - 1 ? 'opacity-100' : 'opacity-40'}>{log}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Catalog Section */}
            <section id="explore" className="p-8 md:p-16 max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-12 h-[2px] bg-accent" />
                            <span className="text-[10px] font-mono font-black text-accent uppercase">BUFFER_STREAM</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase">Catalog_Registry</h2>
                    </div>
                    <div className="bg-secondary text-primary p-4 border-2 border-primary shadow-[8px_8px_0px_0px_white]">
                        <span className="font-mono text-[10px] font-black uppercase block border-b border-primary/20 mb-1">Authenticated_Search</span>
                        <span className="font-mono text-xl font-black uppercase">ALL_ASSETS_LIVE</span>
                    </div>
                </div>

                {nfts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20">
                        {nfts.map((nft, index) => (
                            <div key={`${nft.tokenId}-${index}`} className="animate-snap-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                <NFTCard nft={nft} onBuy={handleBuyNFT} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="border-4 border-secondary p-32 text-center bg-gray-dark relative overflow-hidden group">
                        <div className="absolute inset-0 bg-primary opacity-50 group-hover:opacity-10 transition-opacity duration-1000" />
                        <div className="relative z-10">
                            <div className="w-24 h-24 mx-auto border-4 border-accent mb-8 relative">
                                <div className="absolute inset-2 border-2 border-secondary animate-pulse" />
                            </div>
                            <h3 className="text-4xl text-secondary font-black uppercase mb-4 tracking-tighter">NO_ASSETS_IN_REGISTRY</h3>
                            <p className="font-mono text-gray-400 uppercase font-black tracking-widest text-xs">Waiting for decentralized block input...</p>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}
