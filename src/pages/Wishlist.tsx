import React from 'react';
import { Heart, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Wishlist: React.FC = () => {
    const navigate = useNavigate();
    const { wishlist, toggleWishlist, addToCart } = useShop();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8">My Wishlist</h2>

            {wishlist.length === 0 ? (
                <div className="text-center py-20">
                    <Heart className="w-20 h-20 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-600 mb-6">Save your favorite cards here for later!</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Browse Cards
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlist.map(card => (
                        <div key={card.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 p-8 h-48 flex items-center justify-center">
                                <div className="text-6xl">{card.image}</div>
                                <button
                                    onClick={() => toggleWishlist(card)}
                                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
                                >
                                    <X className="w-4 h-4 text-red-500" />
                                </button>
                            </div>

                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-1">{card.name}</h3>
                                <p className="text-sm text-gray-600 mb-2">{card.game}</p>

                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                        {card.rarity}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-blue-600">
                                        ${card.price.toLocaleString()}
                                    </span>
                                    <button
                                        onClick={() => addToCart(card)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
