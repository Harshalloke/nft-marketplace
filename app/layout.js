import '../styles/globals.css';
import { NFTProvider } from '../context/NFTContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';
import MouseFollower from '../components/MouseFollower';

export const metadata = {
    title: 'AETHERIA_SYSTEM_v2.0',
    description: 'Brutalist Protocol for Asset Tokenization',
    keywords: ['NFT', 'Marketplace', 'Brutalism', 'Web3', 'Blockchain'],
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="custom-scrollbar relative">
                {/* Global Aesthetics */}
                <div className="scanline" />
                <div className="noise" />
                <Preloader />
                <MouseFollower />

                <NFTProvider>
                    <div className="min-h-screen flex flex-col relative z-10">
                        <Navbar />
                        {/* Main Grid Wrapper */}
                        <main className="flex-grow pt-20">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </NFTProvider>
            </body>
        </html>
    );
}
