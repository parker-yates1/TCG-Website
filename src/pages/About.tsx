import React from 'react';

const About: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8">About TCG Marketplace</h2>

            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                <h3 className="text-2xl font-bold mb-4">The Best Place to Buy and Sell Trading Cards</h3>
                <p className="text-gray-600 mb-4">
                    TCG Marketplace is the world's largest online marketplace for trading card games. Whether you're a collector, player, or seller, we provide the tools and community to help you succeed.
                </p>
                <p className="text-gray-600">
                    With millions of cards listed from thousands of sellers, competitive pricing, and buyer protection, TCG Marketplace makes it easy and safe to grow your collection.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-4xl mb-3">🎯</div>
                    <h4 className="font-bold mb-2">10M+</h4>
                    <p className="text-sm text-gray-600">Cards Available</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-4xl mb-3">👥</div>
                    <h4 className="font-bold mb-2">500K+</h4>
                    <p className="text-sm text-gray-600">Active Users</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-4xl mb-3">⭐</div>
                    <h4 className="font-bold mb-2">4.8/5</h4>
                    <p className="text-sm text-gray-600">Average Rating</p>
                </div>
            </div>
        </div>
    );
};

export default About;
