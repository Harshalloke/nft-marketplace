'use client';

import React from 'react';

const Loader = ({ message = 'PROCESSING_DATA...' }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-primary overflow-hidden">
            {/* Background Grid Accent */}
            <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle, #E5E5E5 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

            <div className="relative flex flex-col items-center p-12 border-4 border-secondary bg-primary shadow-[12px_12px_0px_0px_#7C3AED]">
                {/* Square Brutalist Spinner */}
                <div className="relative w-24 h-24 mb-10 border-4 border-secondary/20 flex items-center justify-center">
                    <div className="absolute inset-0 border-t-4 border-accent animate-[spin_1s_steps(8)_infinite]" />
                    <div className="w-12 h-12 bg-secondary border-4 border-primary" />
                </div>

                {/* Technical Messaging */}
                <div className="text-center font-mono">
                    <p className="text-2xl font-black text-secondary tracking-widest uppercase mb-4 animate-pulse">
                        {message}
                    </p>
                    <div className="flex justify-center space-x-1">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="w-3 h-3 bg-secondary border border-primary animate-bounce"
                                style={{ animationDelay: `${i * 0.1}s`, animationDuration: '0.6s' }}
                            />
                        ))}
                    </div>
                </div>

                {/* Industrial Labels */}
                <div className="absolute -bottom-4 -left-4 bg-secondary text-primary px-3 py-1 text-[10px] font-black uppercase border-2 border-primary">
                    STATUS_LOADING
                </div>
                <div className="absolute -top-4 -right-4 bg-accent text-primary px-3 py-1 text-[10px] font-black uppercase border-2 border-primary">
                    SYS_v2.0
                </div>
            </div>
        </div>
    );
};

export default Loader;
