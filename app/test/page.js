'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function TestPage() {
    const [status, setStatus] = useState('Checking...');
    const [account, setAccount] = useState('');
    const [chainId, setChainId] = useState('');
    const [contractStatus, setContractStatus] = useState('Checking...');

    useEffect(() => {
        checkConnection();
    }, []);

    const checkConnection = async () => {
        // Check MetaMask
        if (!window.ethereum) {
            setStatus('❌ MetaMask not installed');
            return;
        }
        setStatus('✅ MetaMask installed');

        try {
            // Get chain ID
            const chain = await window.ethereum.request({ method: 'eth_chainId' });
            setChainId(chain);

            // Get accounts
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                setAccount(accounts[0]);
            }

            // Check contract
            const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const code = await provider.getCode(contractAddress);

            if (code === '0x') {
                setContractStatus('❌ Contract NOT deployed at this address');
            } else {
                setContractStatus('✅ Contract found at address!');
            }
        } catch (error) {
            console.error(error);
            setStatus('❌ Error: ' + error.message);
        }
    };

    const connectWallet = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
            checkConnection();
        } catch (error) {
            alert('Failed to connect: ' + error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-bg p-8">
            <div className="glass-dark rounded-2xl p-8 max-w-2xl w-full">
                <h1 className="text-3xl font-bold gradient-text mb-8">Connection Test</h1>

                <div className="space-y-4 text-white">
                    <div className="p-4 bg-white/5 rounded-lg">
                        <strong>MetaMask Status:</strong> {status}
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg">
                        <strong>Connected Account:</strong> {account || 'Not connected'}
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg">
                        <strong>Chain ID:</strong> {chainId} {chainId === '0x539' ? '✅ (Correct - 1337)' : '❌ (Wrong! Should be 0x539)'}
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg">
                        <strong>Contract Status:</strong> {contractStatus}
                    </div>

                    {!account && (
                        <button
                            onClick={connectWallet}
                            className="btn-primary w-full mt-4"
                        >
                            Connect Wallet
                        </button>
                    )}

                    <button
                        onClick={checkConnection}
                        className="btn-secondary w-full mt-2"
                    >
                        Recheck Connection
                    </button>
                </div>

                <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
                    <p className="text-yellow-400 text-sm">
                        <strong>Expected Values:</strong><br />
                        • Chain ID: 0x539 (1337 in hex)<br />
                        • Contract: 0x5FbDB2315678afecb367f032d93F642f64180aa3<br />
                        • Network: Hardhat Local
                    </p>
                </div>
            </div>
        </div>
    );
}
