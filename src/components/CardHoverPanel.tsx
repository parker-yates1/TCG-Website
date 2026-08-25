import React from 'react';
import { Heart, ShoppingCart, Star, Sparkles } from 'lucide-react';
import { Card } from '../types';
import { useShop } from '../context/ShopContext';

interface CardHoverPanelProps {
    card: Card;
    isOpen: boolean;
    compactView?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

const CardHoverPanel: React.FC<CardHoverPanelProps> = ({
    card,
    isOpen,
    compactView = false,
    onMouseEnter,
    onMouseLeave
}) => {
    const { addToCart, toggleWishlist, wishlist } = useShop();
    const isWishlisted = wishlist.some(item => item.id === card.id);

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`absolute bottom-0 left-0 right-0 h-[80%] z-20 bg-white/95 dark:bg-[#1e293b]/95 backdrop-blur-md border-t border-gray-200/80 dark:border-white/10 shadow-2xl rounded-t-2xl flex flex-col justify-between transition-all duration-300 ease-out transform ${
                isOpen
                    ? 'translate-y-0 opacity-100 pointer-events-auto'
                    : 'translate-y-full opacity-0 pointer-events-none'
            } ${compactView ? 'p-2.5' : 'p-3.5 sm:p-4'}`}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Top section: Badges & Name */}
            <div className="flex flex-col gap-1 overflow-hidden">
                <div className="flex items-center justify-between gap-1">
                    <span className="text-[9px] sm:text-[10px] font-bold text-blue-600 dark:text-violet-400 uppercase tracking-wider bg-blue-50 dark:bg-violet-900/30 px-2 py-0.5 rounded-full truncate max-w-[65%]">
                        {card.game}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30 border border-purple-200/60 dark:border-purple-800/40 px-1.5 py-0.5 rounded-md truncate">
                        {card.rarity}
                    </span>
                </div>

                <h3
                    className={`font-heading font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 ${
                        compactView ? 'text-xs mt-0.5' : 'text-sm sm:text-base mt-1'
                    }`}
                    title={card.name}
                >
                    {card.name}
                </h3>

                {/* Seller & Rating */}
                <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    <span className="truncate max-w-[60%]">
                        by <span className="font-medium text-gray-700 dark:text-gray-300">{card.seller}</span>
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-500 font-semibold shrink-0">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{card.rating}</span>
                    </div>
                </div>

                {/* Condition Tag */}
                <div className="flex items-center gap-1 mt-1">
                    <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-md font-medium border border-gray-200 dark:border-white/10">
                        {card.condition}
                    </span>
                    {card.rarity.toLowerCase().includes('rare') && (
                        <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 rounded-md font-medium border border-amber-200 dark:border-amber-800/40 flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5" /> Foil
                        </span>
                    )}
                </div>
            </div>

            {/* Middle section: Price & Stock */}
            <div className={`border-t border-gray-100 dark:border-white/10 flex items-center justify-between ${compactView ? 'pt-1.5 my-1' : 'pt-2 my-1.5'}`}>
                <div>
                    <div className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider leading-none">Price</div>
                    <div className={`font-heading font-bold text-blue-600 dark:text-violet-400 ${compactView ? 'text-sm' : 'text-lg sm:text-xl'}`}>
                        ${card.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-1 text-[10px] sm:text-xs font-medium text-emerald-600 dark:text-emerald-400 justify-end">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>{card.stock} in stock</span>
                    </div>
                </div>
            </div>

            {/* Bottom section: Quick Action Buttons */}
            <div className="flex items-center gap-1.5">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        addToCart(card);
                    }}
                    className={`flex-1 flex items-center justify-center gap-1.5 bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 hover:bg-blue-700 dark:hover:from-violet-700 dark:hover:to-blue-700 active:scale-[0.98] text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all ${
                        compactView ? 'py-1 text-[10px]' : 'py-1.5 sm:py-2 text-xs sm:text-sm'
                    }`}
                >
                    <ShoppingCart className={compactView ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
                    <span>Add to Cart</span>
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(card);
                    }}
                    title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    className={`shrink-0 flex items-center justify-center rounded-lg border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/30 transition-colors ${
                        isWishlisted
                            ? 'bg-red-50 dark:bg-red-950/40 text-red-500 border-red-200 dark:border-red-800/40'
                            : 'bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-red-500'
                    } ${compactView ? 'p-1' : 'p-1.5 sm:p-2'}`}
                >
                    <Heart className={`${compactView ? 'w-3 h-3' : 'w-4 h-4'} ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
            </div>
        </div>
    );
};

export default CardHoverPanel;
