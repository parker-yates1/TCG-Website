import React from 'react';
import { Heart } from 'lucide-react';
import { useProduct } from '../context/ProductContext';
import { useShop } from '../context/ShopContext';

const CardGrid: React.FC = () => {
    const {
        cards,
        setSelectedCard,
        setHoveredCard,
        setSearchQuery,
        setFilters,
        viewMode,
        compactView
    } = useProduct();

    const {
        toggleWishlist,
        wishlist
    } = useShop();

    if (cards.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No cards found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search query</p>
                <button
                    onClick={() => {
                        setSearchQuery('');
                        setFilters({ game: [], rarity: [], condition: [], priceRange: [], printing: [], minPrice: '', maxPrice: '' });
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Clear all filters
                </button>
            </div>
        );
    }

    if (viewMode === 'list') {
        return (
            <div className="flex flex-col gap-4">
                {cards.map(card => (
                    <div
                        key={card.id}
                        onClick={() => setSelectedCard(card)}
                        className={`bg-white rounded-lg border border-gray-100 hover:border-blue-300 shadow-sm flex items-center transition-all hover:shadow-md cursor-pointer group ${compactView ? 'p-2 gap-2' : 'p-4 gap-4'}`}
                    >
                        {/* Thumbnail */}
                        <div className={`bg-gray-100 rounded overflow-hidden flex-shrink-0 ${compactView ? 'w-10 h-14' : 'w-16 h-20'}`}>
                            <img
                                src={card.image}
                                alt={card.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{card.game}</span>
                                <span className="bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded border border-gray-200 uppercase font-medium">{card.condition}</span>
                            </div>
                            <h3 className={`font-heading font-bold text-gray-900 truncate ${compactView ? 'text-sm' : 'text-base'}`} title={card.name}>{card.name}</h3>
                            <div className="text-xs text-gray-500 mt-1">{card.rarity}</div>
                        </div>

                        {/* Price & Stock */}
                        <div className="text-right flex flex-col items-end min-w-[100px]">
                            <span className={`font-heading font-bold text-blue-600 ${compactView ? 'text-base' : 'text-lg'}`}>${card.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                            <span className="text-xs text-gray-400">{card.stock} in stock</span>
                        </div>

                        {/* Actions */}
                        <div className={`flex items-center gap-2 pl-4 border-l border-gray-100 ml-4 ${compactView ? 'hidden sm:flex' : 'flex'}`} onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={(e) => { e.stopPropagation(); toggleWishlist(card); }}
                                className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${wishlist.find(item => item.id === card.id) ? 'text-red-500' : 'text-gray-400'}`}
                            >
                                <Heart className={`w-5 h-5 ${wishlist.find(item => item.id === card.id) ? 'fill-current' : ''}`} />
                            </button>
                            <button className={`bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition ${compactView ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}`}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className={`grid gap-6 ${compactView ? 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'}`}>
            {cards.map(card => (
                <div
                    key={card.id}
                    className="group bg-gradient-to-b from-gray-100 to-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col overflow-hidden relative hover:-translate-y-1"
                    onMouseEnter={() => setHoveredCard(card.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => setSelectedCard(card)}
                >
                    {/* Image Area */}
                    <div className="relative bg-white overflow-hidden aspect-[3/4]">
                        <img
                            src={card.image}
                            alt={card.name}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Foil Effect Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                        <button
                            onClick={(e) => { e.stopPropagation(); toggleWishlist(card); }}
                            className={`absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:text-red-500 transition-all z-10 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100`}
                        >
                            <Heart
                                className={`w-3.5 h-3.5 transition-colors ${wishlist.find(item => item.id === card.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                            />
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className={`${compactView ? 'p-2' : 'p-4'} flex flex-col flex-1 gap-1`}>
                        <div>
                            <p className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase mb-0.5">{card.game}</p>
                            <h3 className={`font-heading font-bold text-gray-900 leading-tight line-clamp-2 ${compactView ? 'text-xs min-h-[2rem]' : 'text-sm min-h-[2.5rem]'}`} title={card.name}>
                                {card.name}
                            </h3>
                        </div>

                        <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-[10px] px-1.5 py-0.5 bg-white text-gray-600 rounded-full font-medium border border-gray-200 shadow-sm">
                                {card.condition}
                            </span>
                        </div>

                        <div className={`mt-auto pt-2 flex items-end justify-between border-t border-gray-300 ${compactView ? 'pt-1.5' : 'pt-3'}`}>
                            <div>
                                <div className="text-[10px] text-gray-400 mb-0">Price</div>
                                <span className={`${compactView ? 'text-sm' : 'text-xl'} font-bold text-blue-600 font-heading`}>
                                    ${card.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                            <div className="text-[10px] text-gray-500 text-right">
                                {card.stock} left
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardGrid;
