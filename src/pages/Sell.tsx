import React from 'react';
import { Package, TrendingUp, CreditCard } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const Sell: React.FC = () => {
    const { showNotification } = useNotification();
    const games = ['Magic: The Gathering', 'Pokemon', 'Yu-Gi-Oh!', 'Lorcana'];
    const conditions = ['Near Mint', 'Lightly Played', 'Moderately Played', 'Heavily Played'];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8">Sell Your Cards</h2>

            <div className="bg-white rounded-lg shadow-md p-8">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                        <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                            <Package className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="font-bold mb-2">List Your Cards</h3>
                        <p className="text-sm text-gray-600">Add your cards with photos and details</p>
                    </div>

                    <div className="text-center">
                        <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                            <TrendingUp className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="font-bold mb-2">Get Fair Prices</h3>
                        <p className="text-sm text-gray-600">Set competitive prices based on market value</p>
                    </div>

                    <div className="text-center">
                        <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                            <CreditCard className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="font-bold mb-2">Get Paid Fast</h3>
                        <p className="text-sm text-gray-600">Receive payment quickly after sale</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter card name"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Game</label>
                            <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Select game</option>
                                {games.map(game => <option key={game} value={game}>{game}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                            <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Select condition</option>
                                {conditions.map(condition => <option key={condition} value={condition}>{condition}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                            <input
                                type="number"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                            <input
                                type="number"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="1"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photos</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer">
                            <div className="text-gray-400 mb-2">📸</div>
                            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        </div>
                    </div>

                    <button
                        onClick={() => showNotification('Card listed successfully!')}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        List Card for Sale
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sell;
