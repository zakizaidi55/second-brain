import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiYoutube, FiTwitter } from 'react-icons/fi';

export default function LandingPage() {
    const [isOpen, setIsOpen] = useState(false);

    const sidebarVariants = {
        open: { x: 0 },
        closed: { x: '-100%' },
    };

    const links = [
        { id: 1, type: 'youtube', url: 'http://localhost:5173/signin', title: 'Signin' },
        { id: 2, type: 'twitter', url: 'http://localhost:5173/signup', title: 'Signup' },
    ];

    return (
        <div className="relative min-h-screen bg-gray-100">
            
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 p-2 rounded-full bg-blue-500 text-white"
            >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            <motion.div
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={sidebarVariants}
                transition={{ duration: 0.3 }}
                className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-40"
            >
                <div className="p-4 mt-18">
                    <h2 className="text-xl font-bold mb-4">My Second Brain</h2>
                    <div className="space-y-4">
                        {links.map((link) => (
                            <a
                                key={link.id}
                                href={link.url}
                                className="flex items-center p-2 hover:bg-gray-100 rounded"
                            >
                                {link.type === 'youtube' ? (
                                    <FiYoutube className="text-red-500 mr-2" />
                                ) : (
                                    <FiTwitter className="text-blue-400 mr-2" />
                                )}
                                <span className="text-sm">{link.title}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="p-8 ml-6">
                <h1 className="text-3xl font-bold mb-6">Welcome to Your Second Brain</h1>
                <p className="text-gray-600">
                    Store and organize your favorite YouTube videos and Twitter posts in one place.
                </p>
            </div>
        </div>
    );
}