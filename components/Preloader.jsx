'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
    const [loading, setLoading] = useState(true);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const hasLoaded = sessionStorage.getItem('aetheria_loaded');
        if (hasLoaded) {
            setLoading(false);
            return;
        }

        const interval = setInterval(() => {
            setPercent((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setLoading(false);
                        sessionStorage.setItem('aetheria_loaded', 'true');
                    }, 500);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 15) + 5;
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[9999] bg-primary flex flex-col items-center justify-center p-8 overflow-hidden"
                >
                    {/* Background Grid */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #E5E5E5 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                    <div className="relative z-10 w-full max-w-2xl">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className="h-1 bg-accent mb-12 origin-left"
                        />

                        <div className="flex justify-between items-end mb-4">
                            <motion.h1
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="text-6xl md:text-8xl font-black text-secondary tracking-tighter uppercase leading-none"
                            >
                                Aetheria<br />
                                <span className="text-outline">Protocol</span>
                            </motion.h1>
                            <div className="text-right font-mono text-accent">
                                <span className="text-4xl font-black">{Math.min(percent, 100)}%</span>
                                <p className="text-[10px] font-black uppercase tracking-widest mt-2">Initializing_Stream</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 * i }}
                                    className="h-24 bg-gray-dark border-2 border-secondary/20 flex items-center justify-center"
                                >
                                    <div className={`w-full h-full bg-accent/20 origin-bottom`} style={{ transform: `scaleY(${Math.min(percent / (25 * i), 1)})` }} />
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-12 flex justify-between font-mono text-[9px] text-gray-mid font-black uppercase">
                            <span>System_v2.0.4_Build_778</span>
                            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>
                                &gt; Loading_Encrypted_Assets...
                            </motion.span>
                            <span>Est_Release: Immediate</span>
                        </div>
                    </div>

                    <div className="absolute top-8 left-8 border-2 border-secondary p-2">
                        <div className="w-8 h-8 flex items-center justify-center font-black text-xs text-secondary italic">A2</div>
                    </div>
                    <div className="absolute bottom-8 right-8 border-2 border-secondary p-2">
                        <div className="font-mono text-[10px] text-secondary font-black">X: 1337 / Y: 8545</div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
