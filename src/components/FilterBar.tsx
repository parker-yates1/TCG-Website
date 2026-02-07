import React from 'react';
import { ChevronDown, AlignJustify, Grid, Minimize2, Maximize2 } from 'lucide-react';
import { useProduct } from '../context/ProductContext';

const FilterBar: React.FC = () => {
    const {
        filters,
        setFilters,
        showFilters,
        setShowFilters,
        sortBy,
        setSortBy,
        resultsCount,
        viewMode,
        setViewMode,
        compactView,
        setCompactView
    } = useProduct();

    const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

    const games = ['Magic: The Gathering', 'Pokemon', 'Yu-Gi-Oh!', 'Lorcana'];
    const rarities = ['Common', 'Uncommon', 'Rare', 'Mythic Rare', 'Secret Rare'];
    const conditions = ['Near Mint', 'Lightly Played', 'Moderately Played', 'Heavily Played'];
    const printings = ['Normal', 'Foil', 'Etched Foil', 'Textured'];

    const toggleDropdown = (name: string) => {
        if (activeDropdown === name) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(name);
        }
    };

    // Close dropdowns when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (activeDropdown &&
                !target.closest('.dropdown-button') &&
                !target.closest('#active-dropdown-tray')) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeDropdown]);

    // activeFiltersCount now counts selected items in arrays, plus custom price range if active
    const activeFiltersCount = Object.values(filters).flat().length + ((filters.minPrice || filters.maxPrice) ? 1 : 0);

    const toggleFilter = (type: 'game' | 'rarity' | 'condition' | 'printing' | 'priceRange', value: string) => {
        const current = filters[type];
        let newValues: string[];

        if (current.includes(value)) {
            newValues = current.filter(v => v !== value);
        } else {
            newValues = [...current, value];
        }

        setFilters({ ...filters, [type]: newValues });
    };

    const isSelected = (type: 'game' | 'rarity' | 'condition' | 'printing' | 'priceRange', value: string) => {
        return filters[type].includes(value);
    };

    const getButtonLabel = (type: 'game' | 'rarity' | 'condition' | 'printing' | 'priceRange', defaultLabel: string) => {
        if (type === 'priceRange') {
            if (filters.minPrice || filters.maxPrice) {
                const min = filters.minPrice || '0';
                const max = filters.maxPrice || 'Any';
                return `$${min} - $${max}`;
            }
        }

        const selected = filters[type];
        if (selected.length === 0) return defaultLabel;
        if (selected.length === 1) {
            // Price range special handling for display if needed, but value is fine for now
            if (type === 'priceRange') {
                const rangeMap: Record<string, string> = {
                    'under10': 'Under $10',
                    '10to50': '$10 - $50',
                    '50to200': '$50 - $200',
                    'over200': 'Over $200'
                };
                return rangeMap[selected[0]] || selected[0];
            }
            return selected[0];
        }
        return `${selected.length} Selected`;
    };

    return (
        <div className="bg-white sticky top-[62px] md:top-[100px] z-[49] bg-white transition-all duration-300">
            <div className="border-b shadow-sm bg-white">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">

                            {/* Game Button */}
                            <button
                                onClick={() => toggleDropdown('game')}
                                className={`dropdown-button px-3 py-1.5 border rounded-full text-sm whitespace-nowrap flex items-center gap-1 transition-colors ${filters.game.length > 0 || activeDropdown === 'game'
                                    ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium'
                                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                    }`}
                            >
                                {getButtonLabel('game', 'Game')} <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'game' ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Rarity Button */}
                            <button
                                onClick={() => toggleDropdown('rarity')}
                                className={`dropdown-button px-3 py-1.5 border rounded-full text-sm whitespace-nowrap flex items-center gap-1 transition-colors ${filters.rarity.length > 0 || activeDropdown === 'rarity'
                                    ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium'
                                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                    }`}
                            >
                                {getButtonLabel('rarity', 'Rarity')} <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'rarity' ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Condition Button */}
                            <button
                                onClick={() => toggleDropdown('condition')}
                                className={`dropdown-button px-3 py-1.5 border rounded-full text-sm whitespace-nowrap flex items-center gap-1 transition-colors ${filters.condition.length > 0 || activeDropdown === 'condition'
                                    ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium'
                                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                    }`}
                            >
                                {getButtonLabel('condition', 'Condition')} <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'condition' ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Printing Button */}
                            <button
                                onClick={() => toggleDropdown('printing')}
                                className={`dropdown-button px-3 py-1.5 border rounded-full text-sm whitespace-nowrap flex items-center gap-1 transition-colors ${filters.printing.length > 0 || activeDropdown === 'printing'
                                    ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium'
                                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                    }`}
                            >
                                {getButtonLabel('printing', 'Printing')} <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'printing' ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Price Button */}
                            <button
                                onClick={() => toggleDropdown('priceRange')}
                                className={`dropdown-button px-3 py-1.5 border rounded-full text-sm whitespace-nowrap flex items-center gap-1 transition-colors ${filters.priceRange.length > 0 || activeDropdown === 'priceRange'
                                    ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium'
                                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                    }`}
                            >
                                {getButtonLabel('priceRange', 'Price')} <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'priceRange' ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Clear Filters (Only show if any active) */}
                            {activeFiltersCount > 0 && (
                                <button
                                    onClick={() => setFilters({ game: [], rarity: [], condition: [], priceRange: [], printing: [] })}
                                    className="text-blue-600 text-sm font-medium hover:underline ml-2 whitespace-nowrap"
                                >
                                    Clear All
                                </button>
                            )}
                        </div>

                        <div className="hidden md:flex items-center gap-4 pl-4 border-l ml-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500 font-medium">Sort & View</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="text-sm font-bold text-gray-900 border-none focus:ring-0 cursor-pointer py-0 pl-2 pr-8 bg-transparent"
                                >
                                    <option value="relevance">Best Match</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="name">Name: A-Z</option>
                                </select>
                            </div>
                            <div className="flex border rounded-lg overflow-hidden gap-px bg-gray-200">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-1.5 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                                    title="Grid View"
                                >
                                    <Grid size={18} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-1.5 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                                    title="List View"
                                >
                                    <AlignJustify size={18} />
                                </button>
                                <div className="w-px bg-gray-200"></div>
                                <button
                                    onClick={() => setCompactView(!compactView)}
                                    className={`p-1.5 ${compactView ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                                    title={compactView ? "Standard Size" : "Compact Size"}
                                >
                                    {compactView ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Active Dropdown Tray */}
                    {activeDropdown && (
                        <div id="active-dropdown-tray" className="pt-4 pb-2 animate-in slide-in-from-top-2 fade-in duration-200 border-t mt-3 border-gray-100">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Select {activeDropdown === 'priceRange' ? 'Price Range' : activeDropdown} (Multi-select)
                                </h3>
                                <button onClick={() => setActiveDropdown(null)} className="text-gray-400 hover:text-gray-600 text-xs">
                                    Close
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {activeDropdown === 'game' && (
                                    <>
                                        <button onClick={() => setFilters({ ...filters, game: [] })} className={`px-4 py-2 rounded-lg text-sm border transition-all ${filters.game.length === 0 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400'}`}>Any Game</button>
                                        {games.map(game => (<button key={game} onClick={() => toggleFilter('game', game)} className={`px-4 py-2 rounded-lg text-sm border transition-all ${isSelected('game', game) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400'}`}>{game}</button>))}
                                    </>
                                )}
                                {activeDropdown === 'rarity' && (
                                    <>
                                        <button onClick={() => setFilters({ ...filters, rarity: [] })} className={`px-4 py-2 rounded-lg text-sm border transition-all ${filters.rarity.length === 0 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400'}`}>Any Rarity</button>
                                        {rarities.map(rarity => (<button key={rarity} onClick={() => toggleFilter('rarity', rarity)} className={`px-4 py-2 rounded-lg text-sm border transition-all ${isSelected('rarity', rarity) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400'}`}>{rarity}</button>))}
                                    </>
                                )}
                                {activeDropdown === 'condition' && (
                                    <>
                                        <button onClick={() => setFilters({ ...filters, condition: [] })} className={`px-4 py-2 rounded-lg text-sm border transition-all ${filters.condition.length === 0 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400'}`}>Any Condition</button>
                                        {conditions.map(condition => (<button key={condition} onClick={() => toggleFilter('condition', condition)} className={`px-4 py-2 rounded-lg text-sm border transition-all ${isSelected('condition', condition) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400'}`}>{condition}</button>))}
                                    </>
                                )}
                                {activeDropdown === 'printing' && (
                                    <>
                                        <button onClick={() => setFilters({ ...filters, printing: [] })} className={`px-4 py-2 rounded-lg text-sm border transition-all ${filters.printing.length === 0 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400'}`}>Any Printing</button>
                                        {printings.map(printing => (<button key={printing} onClick={() => toggleFilter('printing', printing)} className={`px-4 py-2 rounded-lg text-sm border transition-all ${isSelected('printing', printing) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400'}`}>{printing}</button>))}
                                    </>
                                )}
                                {activeDropdown === 'priceRange' && (
                                    <>
                                        <div className="w-full pb-2 mb-2 border-b border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <div className="relative flex-1">
                                                    <span className="absolute left-2 top-1.5 text-gray-500 text-sm">$</span>
                                                    <input
                                                        type="number"
                                                        placeholder="Min"
                                                        value={filters.minPrice || ''}
                                                        onChange={(e) => {
                                                            setFilters({ ...filters, minPrice: e.target.value, priceRange: [] });
                                                        }}
                                                        className="w-full pl-6 pr-2 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                                <span className="text-gray-400">-</span>
                                                <div className="relative flex-1">
                                                    <span className="absolute left-2 top-1.5 text-gray-500 text-sm">$</span>
                                                    <input
                                                        type="number"
                                                        placeholder="Max"
                                                        value={filters.maxPrice || ''}
                                                        onChange={(e) => {
                                                            setFilters({ ...filters, maxPrice: e.target.value, priceRange: [] });
                                                        }}
                                                        className="w-full pl-6 pr-2 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-2 text-xs text-gray-500 border-b">
                {resultsCount} results in Magic: The Gathering
            </div>
        </div>
    );
};

export default FilterBar;
