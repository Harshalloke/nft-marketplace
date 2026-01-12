'use client';

import React from 'react';
import Image from 'next/image';

const NFTCard = ({ nft, onBuy, showBuyButton = true }) => {
    const handleBuyClick = () => {
        if (onBuy) {
            onBuy(nft);
        }
    };

    return (
        <div className="relative group brutal-card overflow-hidden hover:border-accent transition-colors duration-75">
            {/* Structural Crosshairs */}
            <div className="absolute top-0 left-0 w-8 h-8 z-20 border-t-2 border-l-2 border-accent mix-blend-difference" />
            <div className="absolute bottom-0 right-0 w-8 h-8 z-20 border-b-2 border-r-2 border-accent mix-blend-difference" />

            {/* Technical Labels */}
            <div className="absolute top-0 right-0 z-20 bg-accent text-primary p-1 text-[8px] font-black uppercase leading-none">
                PROTOCOL_ID::{nft.tokenId}
            </div>

            {/* Image Containment with Measurements */}
            <div className="relative aspect-square overflow-hidden bg-gray-dark border-b-2 border-secondary">
                {/* Vertical Measure */}
                <div className="absolute left-2 top-0 h-full flex flex-col justify-between py-4 z-10 pointer-events-none opacity-40">
                    <div className="w-1 h-px bg-secondary" />
                    <div className="w-2 h-px bg-secondary" />
                    <div className="w-1 h-px bg-secondary" />
                </div>

                <Image
                    src={nft.image}
                    alt={nft.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Hover Data Overlay */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-center border-2 border-accent m-4">
                    <div className="font-mono text-[9px] text-accent mb-2 uppercase font-black">
                        &gt; ACCESSING_MANIFEST...
                    </div>
                    <p className="text-[10px] text-gray-light leading-tight font-bold uppercase tracking-widest text-justify">
                        {nft.description || 'BLOCK_DATA_CORRUPTED_OR_NULL'}
                    </p>
                    <div className="mt-4 border-t border-accent/30 pt-4 flex justify-between font-mono text-[8px] text-accent font-black">
                        <span>SECURE_BLOCK</span>
                        <span>VERIFIED_HASH</span>
                    </div>
                </div>
            </div>

            {/* Body Section */}
            <div className="p-5 bg-primary relative">
                <div className="mb-6">
                    <h3 className="text-2xl font-black text-secondary uppercase tracking-tighter leading-[0.9] break-words">
                        {nft.name}
                    </h3>
                    <div className="flex space-x-2 mt-1">
                        <div className="h-1 w-8 bg-accent" />
                        <div className="h-1 w-2 bg-secondary" />
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-mono text-gray-mid font-black uppercase">Market_valuation</span>
                        <span className="text-xl font-black text-secondary font-mono leading-none">{nft.price} ETH</span>
                    </div>

                    {showBuyButton && (
                        <button
                            onClick={handleBuyClick}
                            className="relative p-3 bg-secondary text-primary border-2 border-primary group-hover:bg-accent group-hover:text-primary transition-colors overflow-hidden"
                        >
                            <span className="relative z-10 text-xs font-black uppercase tracking-widest">Acquire</span>
                        </button>
                    )}

                    {!showBuyButton && nft.sold !== undefined && (
                        <div className="bg-gray-mid border border-secondary px-3 py-1">
                            <span className="text-[10px] font-black uppercase text-secondary">
                                {nft.sold ? 'TRANSFERRED' : 'IN_STORAGE'}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Tape Detail */}
            <div className="bg-secondary p-1 overflow-hidden h-4 flex items-center">
                <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] font-mono text-[8px] font-black text-primary uppercase">
                    {Array(10).fill(`AETHERIA_PROTOCOL_v2.0 // STATUS_OPTIMIZED // ID_${nft.tokenId} // `).join('')}
                </div>
            </div>
        </div>
    );
};

export default NFTCard;
