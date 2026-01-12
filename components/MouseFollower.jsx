'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MouseFollower = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998] hidden lg:block"
            animate={{ x: mousePos.x - 20, y: mousePos.y - 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
        >
            <div className="relative w-10 h-10 flex items-center justify-center">
                {/* Horizontal Line */}
                <div className="absolute w-10 h-[1px] bg-accent/40" />
                {/* Vertical Line */}
                <div className="absolute h-10 w-[1px] bg-accent/40" />

                {/* Inner Box */}
                <div className="w-2 h-2 border-[1px] border-accent" />

                {/* Coordinate Text */}
                <div className="absolute top-12 left-12 whitespace-nowrap bg-black/80 px-2 py-1 text-[8px] font-mono text-accent border border-accent/30 font-black">
                    X_{mousePos.x} | Y_{mousePos.y}
                </div>
            </div>
        </motion.div>
    );
};

export default MouseFollower;
