import React from 'react';
import { X, Heart, Star } from 'lucide-react';
import { useProduct } from '../context/ProductContext';
import { useShop } from '../context/ShopContext';

const CardDetailModal: React.FC = () => {
    const { selectedCard, setSelectedCard } = useProduct();
    const { addToCart, toggleWishlist, wishlist } = useShop();
    if (!selectedCard) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40 dark:bg-black/60" onClick={() => setSelectedCard(null)}>
            <div className="bg-white dark:bg-[#1e293b] dark:border dark:border-white/10 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
                <div className="grid md:grid-cols-2">
                    {/* Left: Image Section */}
                    <div className="relative bg-gray-50 dark:bg-[#0f172a] p-8 md:p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 dark:border-white/10">
                        <div className="relative z-10 aspect-[3/4] w-full max-w-sm rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 duration-500">
                            <img
                                src={selectedCard.image}
                                alt={selectedCard.name}
                                className="w-full h-full object-cover"
                            />
                            {/* Shiny overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/30 rounded-xl pointer-events-none" />
                        </div>

                        <div className="mt-8 flex gap-3 overflow-x-auto max-w-full p-2 scrollbar-hide">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-white/10 cursor-pointer hover:border-blue-500 dark:hover:border-violet-500 hover:shadow-md transition-all flex-shrink-0">
                                    <img
                                        src={selectedCard.image}
                                        alt={selectedCard.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Details Section */}
                    <div className="p-8 flex flex-col h-full bg-white dark:bg-[#1e293b] transition-colors duration-300">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-bold tracking-wider text-blue-600 dark:text-violet-400 uppercase bg-blue-50 dark:bg-violet-900/30 px-3 py-1 rounded-full">{selectedCard.game}</span>
                            <button onClick={() => setSelectedCard(null)} className="p-2 -mr-2 -mt-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4 lh-tight">{selectedCard.name}</h2>

                        <div className="flex items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-bold text-gray-900 dark:text-white">{selectedCard.rating}</span>
                                <span className="text-gray-400 dark:text-gray-500">({selectedCard.stock * 3} reviews)</span>
                            </div>
                            <span>•</span>
                            <span>Seller: <span className="font-medium text-blue-600 dark:text-violet-400 hover:underline cursor-pointer">{selectedCard.seller}</span></span>
                        </div>

                        <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-6 mb-8 border border-gray-100 dark:border-white/10">
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-4xl font-bold font-heading text-gray-900 dark:text-white">${selectedCard.price.toLocaleString()}</span>
                                <span className="text-gray-500 dark:text-gray-400 mb-1.5">/ card</span>
                            </div>
                            <p className="text-sm text-green-600 font-medium flex items-center gap-1">
                                <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                                In Stock ({selectedCard.stock} available)
                            </p>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="border border-gray-100 dark:border-white/10 rounded-lg p-3">
                                    <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Condition</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{selectedCard.condition}</span>
                                </div>
                                <div className="border border-gray-100 dark:border-white/10 rounded-lg p-3">
                                    <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Rarity</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{selectedCard.rarity}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto space-y-3">
                            <button
                                onClick={() => { addToCart(selectedCard); setSelectedCard(null); }}
                                className="w-full py-4 bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 dark:hover:shadow-violet-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={() => toggleWishlist(selectedCard)}
                                className={`w-full py-3 rounded-xl font-medium border-2 transition-all flex items-center justify-center gap-2 ${wishlist.find(item => item.id === selectedCard.id)
                                    ? 'border-red-100 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20 text-red-600'
                                    : 'border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-white/30'
                                    }`}
                            >
                                <Heart className={`w-5 h-5 ${wishlist.find(item => item.id === selectedCard.id) ? 'fill-current' : ''}`} />
                                {wishlist.find(item => item.id === selectedCard.id) ? 'Saved to Wishlist' : 'Add to Wishlist'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardDetailModal;
