import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Card, Filters } from '../types';
import { sampleCards } from '../data/mockData';

interface ProductContextType {
    cards: Card[];
    filters: Filters;
    setFilters: (filters: Filters) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
    showFilters: boolean;
    setShowFilters: (show: boolean) => void;
    resultsCount: number;
    selectedCard: Card | null;
    setSelectedCard: (card: Card | null) => void;
    hoveredCard: number | string | null;
    setHoveredCard: (id: number | string | null) => void;
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
    compactView: boolean;
    setCompactView: (compact: boolean) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<Filters>({
        game: [],
        rarity: [],
        condition: [],
        priceRange: [],
        printing: []
    });
    const [sortBy, setSortBy] = useState('relevance');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [hoveredCard, setHoveredCard] = useState<number | string | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [compactView, setCompactView] = useState(false);

    const filteredCards = useMemo(() => {
        return sampleCards.filter(card => {
            const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                card.game.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesGame = filters.game.length === 0 || filters.game.includes(card.game);
            const matchesRarity = filters.rarity.length === 0 || filters.rarity.includes(card.rarity);
            const matchesCondition = filters.condition.length === 0 || filters.condition.includes(card.condition);

            // Mock data printing check (assumed true for now as mock data lacks it)
            const matchesPrinting = true;

            let matchesPrice = true;
            if (filters.minPrice || filters.maxPrice) {
                const min = filters.minPrice ? parseFloat(filters.minPrice) : 0;
                const max = filters.maxPrice ? parseFloat(filters.maxPrice) : Infinity;
                matchesPrice = card.price >= min && card.price <= max;
            } else if (filters.priceRange.length > 0) {
                // If any price range is selected, card must match at least one
                matchesPrice = filters.priceRange.some(range => {
                    if (range === 'under10') return card.price < 10;
                    if (range === '10to50') return card.price >= 10 && card.price < 50;
                    if (range === '50to200') return card.price >= 50 && card.price < 200;
                    if (range === 'over200') return card.price >= 200;
                    return false;
                });
            }

            return matchesSearch && matchesGame && matchesRarity && matchesCondition && matchesPrice && matchesPrinting;
        });
    }, [searchQuery, filters]);

    const sortedCards = useMemo(() => {
        return [...filteredCards].sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            return 0;
        });
    }, [filteredCards, sortBy]);

    return (
        <ProductContext.Provider value={{
            cards: sortedCards,
            filters,
            setFilters,
            searchQuery,
            setSearchQuery,
            sortBy,
            setSortBy,
            showFilters,
            setShowFilters,
            resultsCount: sortedCards.length,
            selectedCard,
            setSelectedCard,
            hoveredCard,
            setHoveredCard,
            viewMode,
            setViewMode,
            compactView,
            setCompactView
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProduct must be used within a ProductProvider');
    }
    return context;
};
