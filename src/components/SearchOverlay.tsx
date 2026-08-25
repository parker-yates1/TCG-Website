import React, { useEffect } from 'react';
import { CardSearchResult } from '../Api/SingleCardApi';

interface SearchOverlayProps {
    query: string;
    results: CardSearchResult[];
    isLoading: boolean;
    error: string | null;
    onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ query, results, isLoading, error, onClose }) => {
    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const showSkeleton = isLoading;
    const showEmpty = !isLoading && !error && query.trim() && results.length === 0;
    const showResults = !isLoading && !error && results.length > 0;

    return (
        <>
            {/* Backdrop — grays out the page */}
            <div
                className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-200"
                onClick={onClose}
            />

            {/* Dropdown panel — rendered via a portal-like approach; positioned by the parent */}
            <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-[#1e293b] rounded-xl shadow-2xl border border-gray-100 dark:border-white/10 z-50 overflow-hidden max-h-[420px] overflow-y-auto">

                {/* Loading skeletons */}
                {showSkeleton && (
                    <ul className="divide-y divide-gray-50 dark:divide-white/5">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <li key={i} className="flex items-center gap-3 p-3 animate-pulse">
                                <div className="w-10 h-14 rounded bg-gray-200 dark:bg-white/10 shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-3/4" />
                                    <div className="h-3 bg-gray-100 dark:bg-white/5 rounded w-1/2" />
                                </div>
                                <div className="h-3 bg-gray-100 dark:bg-white/5 rounded w-12" />
                            </li>
                        ))}
                    </ul>
                )}

                {/* Results */}
                {showResults && (
                    <ul className="divide-y divide-gray-50 dark:divide-white/5">
                        {results.map(card => (
                            <li
                                key={card.id}
                                className="flex items-center gap-3 p-3 hover:bg-blue-50 dark:hover:bg-white/5 transition-colors cursor-pointer group"
                            >
                                {card.imageUrl ? (
                                    <img
                                        src={card.imageUrl}
                                        alt={card.name}
                                        className="w-10 h-14 rounded object-cover shadow-sm shrink-0"
                                    />
                                ) : (
                                    <div className="w-10 h-14 rounded bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0 text-gray-400 dark:text-gray-500 text-xs">
                                        ?
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 dark:text-white text-sm truncate group-hover:text-blue-700 dark:group-hover:text-violet-300">
                                        {card.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{card.setName}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    {card.priceUsd && (
                                        <p className="text-sm font-bold text-gray-800 dark:text-white">${card.priceUsd}</p>
                                    )}
                                    {card.priceUsdFoil && (
                                        <p className="text-xs text-yellow-600 dark:text-yellow-400">✨ ${card.priceUsdFoil}</p>
                                    )}
                                    {!card.priceUsd && !card.priceUsdFoil && (
                                        <p className="text-xs text-gray-400 dark:text-gray-500">No price</p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Empty state */}
                {showEmpty && (
                    <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                        <div className="text-3xl mb-2">🔍</div>
                        <p className="font-medium text-sm">No cards found for <span className="text-gray-800 dark:text-white font-semibold">"{query}"</span></p>
                        <p className="text-xs mt-1 text-gray-400 dark:text-gray-500">Try a different name or spelling</p>
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <div className="px-4 py-8 text-center text-red-500 dark:text-red-400">
                        <div className="text-3xl mb-2">⚠️</div>
                        <p className="font-medium text-sm">{error}</p>
                    </div>
                )}

                {/* Idle / empty query hint */}
                {!query.trim() && !isLoading && (
                    <div className="px-4 py-6 text-center text-gray-400 dark:text-gray-500 text-sm">
                        Start typing to search for cards...
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchOverlay;
