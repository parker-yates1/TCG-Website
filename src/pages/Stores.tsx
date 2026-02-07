import React from 'react';

const Stores: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-4">Local Card Stores</h2>
            <p className="text-gray-600 mb-8">Find trading card game stores near you</p>

            <div className="bg-white rounded-lg shadow-md p-8">
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🏪</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Store Locator</h3>
                    <p className="text-gray-600">
                        Feature coming soon - Find local game stores in your area
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Stores;
