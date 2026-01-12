'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNFT } from '../../context/NFTContext';
import Loader from '../../components/Loader';
import Image from 'next/image';

export default function MintPage() {
    const { createNFT, uploadImage, isLoading } = useNFT();
    const router = useRouter();

    const [formInput, setFormInput] = useState({ price: '', name: '', description: '' });
    const [fileUrl, setFileUrl] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                setUploading(true);
                const url = await uploadImage(file);
                setFileUrl(url);
            } catch (error) {
                console.error('UPLOAD_FAILED:', error);
            } finally {
                setUploading(false);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createNFT({ ...formInput, fileUrl });
            router.push('/');
        } catch (error) {
            console.error('MINTING_ERROR:', error);
        }
    };

    if (isLoading) return <Loader message="EXECUTING_BLOCK_CREATION_PROTOCOL..." />;

    return (
        <main className="min-h-screen pt-28 pb-20 px-8">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-4 border-secondary">

                    {/* Header Banner */}
                    <div className="lg:col-span-12 bg-secondary p-4 border-b-4 border-secondary">
                        <h1 className="text-4xl text-primary font-black uppercase tracking-tighter leading-none">
                            ASSET_SERIALIZATION_FORM_v1.2
                        </h1>
                    </div>

                    {/* Left Panel: Upload/Preview */}
                    <div className="lg:col-span-6 p-12 border-r-4 border-secondary bg-gray-dark">
                        <h2 className="text-2xl font-black mb-8 uppercase text-secondary">A. MEDIA_INPUT</h2>

                        <div className="relative border-4 border-dashed border-gray-mid bg-primary aspect-square group flex items-center justify-center overflow-hidden">
                            {fileUrl ? (
                                <Image src={fileUrl} alt="Preview" fill className="object-cover" />
                            ) : (
                                <div className="text-center p-8">
                                    <div className="w-16 h-16 bg-gray-mid mx-auto mb-4 border-2 border-secondary" />
                                    <p className="font-mono text-gray-400 font-bold uppercase tracking-widest text-xs">
                                        {uploading ? 'UPLOADING_DATA_PACKETS...' : 'DROP_FILE_OR_INPUT_LOCATION'}
                                    </p>
                                </div>
                            )}
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>

                        <div className="mt-8 p-4 bg-gray-mid border-l-4 border-accent">
                            <p className="font-mono text-[10px] uppercase text-gray-light leading-snug font-black">
                                &gt; Accepted formats: PGN, JPG, GIF<br />
                                &gt; Metadata stored on IPFS/Pinata redundant grid
                            </p>
                        </div>
                    </div>

                    {/* Right Panel: Data Inputs */}
                    <div className="lg:col-span-6 p-12 bg-primary">
                        <h2 className="text-2xl font-black mb-8 uppercase text-secondary">B. ATTRIBUTE_SPEC</h2>

                        <form onSubmit={handleSubmit} className="space-y-8 uppercase">
                            <div>
                                <label className="block font-mono text-[10px] font-black text-gray-400 mb-2">IDENTIFICATION_LABEL</label>
                                <input
                                    placeholder="INPUT_NAME_HERE"
                                    onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
                                    className="w-full bg-gray-dark border-2 border-secondary p-4 text-secondary font-black focus:border-accent focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block font-mono text-[10px] font-black text-gray-400 mb-2">FUNCTIONAL_DESCRIPTION</label>
                                <textarea
                                    rows="4"
                                    placeholder="INPUT_TECHNICAL_SPECIFICATIONS"
                                    onChange={(e) => setFormInput({ ...formInput, description: e.target.value })}
                                    className="w-full bg-gray-dark border-2 border-secondary p-4 text-secondary font-black focus:border-accent focus:outline-none resize-none"
                                />
                            </div>

                            <div>
                                <label className="block font-mono text-[10px] font-black text-gray-400 mb-2">VALUATION_SETTING (ETH)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    onChange={(e) => setFormInput({ ...formInput, price: e.target.value })}
                                    className="w-full bg-gray-dark border-2 border-secondary p-4 text-secondary font-black focus:border-accent focus:outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={!fileUrl || !formInput.name || !formInput.price}
                                className="w-full bg-accent text-primary p-6 font-black text-2xl border-4 border-primary shadow-[8px_8px_0px_0px_white] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all disabled:opacity-50 disabled:grayscale"
                            >
                                EXECUTE_MINT
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
