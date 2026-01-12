'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaDiscord, FaTelegram } from 'react-icons/fa';

const Footer = () => {
    const socialLinks = [
        { icon: <FaGithub />, href: '#', label: 'GitHub' },
        { icon: <FaTwitter />, href: '#', label: 'Twitter' },
        { icon: <FaDiscord />, href: '#', label: 'Discord' },
        { icon: <FaTelegram />, href: '#', label: 'Telegram' },
    ];

    return (
        <footer className="relative mt-20 border-t border-white/10 bg-gradient-to-b from-transparent to-dark-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-cyber flex items-center justify-center">
                                <span className="text-2xl font-bold">Æ</span>
                            </div>
                            <span className="text-2xl font-display font-bold gradient-text">
                                Aetheria
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            The premier NFT marketplace for digital artists and collectors.
                            Mint, trade, and discover unique digital assets.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            {['Home', 'Mint', 'My Assets'].map((link) => (
                                <li key={link}>
                                    <motion.a
                                        whileHover={{ x: 5 }}
                                        href={`/${link.toLowerCase().replace(' ', '-')}`}
                                        className="text-gray-400 hover:text-cyber-cyan transition-colors duration-300"
                                    >
                                        {link}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Connect With Us</h3>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-12 h-12 rounded-lg glass flex items-center justify-center text-xl text-gray-400 hover:text-white hover:bg-gradient-cyber transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
                    <p className="text-gray-400 text-sm">
                        © 2026 Aetheria. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            href="#"
                            className="text-gray-400 hover:text-cyber-cyan text-sm transition-colors duration-300"
                        >
                            Privacy Policy
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            href="#"
                            className="text-gray-400 hover:text-cyber-cyan text-sm transition-colors duration-300"
                        >
                            Terms of Service
                        </motion.a>
                    </div>
                </div>
            </div>

            {/* Decorative Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-cyber"></div>
        </footer>
    );
};

export default Footer;
