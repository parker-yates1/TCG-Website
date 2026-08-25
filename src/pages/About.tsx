import React from 'react';

const About: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 dark:text-white">About TCG Marketplace</h2>

            <div className="bg-white dark:bg-[#1e293b] dark:border dark:border-white/10 rounded-lg shadow-md p-8 mb-6 transition-colors duration-300">
                <h3 className="text-2xl font-bold mb-4 dark:text-white">The Best Place to Buy and Sell Trading Cards</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    TCG Marketplace is the world's largest online marketplace for trading card games. Whether you're a collector, player, or seller, we provide the tools and community to help you succeed.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                    With millions of cards listed from thousands of sellers, competitive pricing, and buyer protection, TCG Marketplace makes it easy and safe to grow your collection.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-[#1e293b] dark:border dark:border-white/10 rounded-lg shadow-md p-6 text-center transition-colors duration-300">
                    <div className="text-4xl mb-3">🎯</div>
                    <h4 className="font-bold mb-2 dark:text-white">10M+</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Cards Available</p>
                </div>

                <div className="bg-white dark:bg-[#1e293b] dark:border dark:border-white/10 rounded-lg shadow-md p-6 text-center transition-colors duration-300">
                    <div className="text-4xl mb-3">👥</div>
                    <h4 className="font-bold mb-2 dark:text-white">500K+</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
                </div>

                <div className="bg-white dark:bg-[#1e293b] dark:border dark:border-white/10 rounded-lg shadow-md p-6 text-center transition-colors duration-300">
                    <div className="text-4xl mb-3">⭐</div>
                    <h4 className="font-bold mb-2 dark:text-white">4.8/5</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Average Rating</p>
                </div>
            </div>
        </div>
    );
};

export default About;
