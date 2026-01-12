'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useNFT } from '../context/NFTContext';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const { currentAccount, connectWallet } = useNFT();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [time, setTime] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toUTCString().split(' ')[4]);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const navLinks = [
        { name: 'INDEX', path: '/' },
        { name: 'VAULT', path: '/my-assets' },
        { name: 'SERIALIZE', path: '/mint' },
    ];

    const formatAddress = (address) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] bg-primary border-b-4 border-secondary">
            <div className="max-w-[1600px] mx-auto flex items-center h-20">
                {/* Branding Container */}
                <Link href="/" className="h-full flex items-center px-10 border-r-4 border-secondary hover:bg-accent group transition-colors bg-secondary">
                    <span className="text-2xl font-black italic tracking-tighter text-primary group-hover:text-primary leading-none">
                        AETHERIA_v2
                    </span>
                </Link>

                {/* System Time - Modern Brutalist Detail */}
                <div className="hidden lg:flex items-center px-8 border-r-4 border-secondary h-full font-mono">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-gray-mid uppercase leading-none mb-1">System_Clock_UTC</span>
                        <span className="text-sm font-black text-secondary leading-none">{time}</span>
                    </div>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex flex-grow items-center h-full">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.path}
                            className={`h-full flex items-center px-8 text-xs font-mono font-black tracking-widest transition-colors border-r-4 border-secondary
                ${pathname === link.path ? 'bg-accent text-primary' : 'text-secondary hover:bg-gray-mid'}`}
                        >
                            <span className="relative">
                                {link.name}
                                {pathname === link.path && (
                                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary" />
                                )}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Authentication Terminal */}
                <div className="hidden md:flex items-center h-full px-8 bg-black/50 border-l-4 border-secondary ml-auto">
                    {currentAccount ? (
                        <div className="flex items-center space-x-4 h-full">
                            <div className="relative">
                                <div className="w-3 h-3 bg-neon-green border border-black" />
                                <div className="absolute inset-0 bg-neon-green animate-pulse opacity-50" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-mono text-gray-mid font-black leading-none mb-1 uppercase">Local_Host_Authenticated</span>
                                <span className="text-sm font-mono font-black text-secondary leading-none tracking-tight">
                                    {formatAddress(currentAccount)}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={connectWallet}
                            className="px-6 py-2 bg-accent text-primary border-2 border-primary shadow-[4px_4px_0px_0px_white] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-[10px] font-black uppercase tracking-tighter"
                        >
                            Initialize_Auth
                        </button>
                    )}
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden ml-auto px-8">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-secondary text-2xl">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.1 }}
                        className="fixed inset-0 top-20 bg-primary z-[90] md:hidden flex flex-col p-8 border-t-4 border-secondary"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                onClick={() => setIsOpen(false)}
                                className="py-6 border-b-2 border-secondary/20 text-4xl font-black text-secondary hover:text-accent uppercase tracking-tighter"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="mt-auto">
                            {!currentAccount && (
                                <button
                                    onClick={connectWallet}
                                    className="w-full bg-accent text-primary p-6 text-2xl font-black uppercase border-4 border-primary shadow-[8px_8px_0px_0px_white]"
                                >
                                    Connect_System
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
