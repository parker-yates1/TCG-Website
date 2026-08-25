import React from 'react';

const Stores: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Local Card Stores</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Find trading card game stores near you</p>

            <div className="bg-white dark:bg-[#1e293b] dark:border dark:border-white/10 rounded-lg shadow-md p-8 transition-colors duration-300">
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🏪</div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Store Locator</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Feature coming soon - Find local game stores in your area
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Stores;
