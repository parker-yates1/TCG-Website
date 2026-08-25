import React from 'react';
import { Check } from 'lucide-react';

export interface GameOption {
    id: string;
    name: string;
    description: string;
    badge: string;
    badgeColor: string;
}

export const AVAILABLE_GAMES: GameOption[] = [
    {
        id: 'Magic: The Gathering',
        name: 'Magic: The Gathering',
        description: 'Commander, Modern, Standard & collector sets',
        badge: 'MTG',
        badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
    },
    {
        id: 'Pokémon',
        name: 'Pokémon',
        description: 'Scarlet & Violet, Vintage, Graded & Booster packs',
        badge: 'PKMN',
        badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    },
    {
        id: 'Yu-Gi-Oh!',
        name: 'Yu-Gi-Oh!',
        description: 'Quarter Century Rares, classic formats & staples',
        badge: 'YGO',
        badgeColor: 'bg-red-100 text-red-800 border-red-200',
    },
    {
        id: 'Disney Lorcana',
        name: 'Disney Lorcana',
        description: 'Enchanted rares, First Chapter & tournament singles',
        badge: 'LOR',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    },
    {
        id: 'One Piece',
        name: 'One Piece Card Game',
        description: 'Manga rares, OP booster sets & Leader cards',
        badge: 'OPCG',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    {
        id: 'Star Wars: Unlimited',
        name: 'Star Wars: Unlimited',
        description: 'Hyperspace, showcase leaders & galactic battles',
        badge: 'SWU',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
        id: 'Digimon',
        name: 'Digimon Card Game',
        description: 'Alt-arts, Secret Rares & competitive decks',
        badge: 'DIGI',
        badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    },
    {
        id: 'Flesh and Blood',
        name: 'Flesh and Blood',
        description: 'Cold Foils, Legendary equipment & armory singles',
        badge: 'FAB',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    },
];

interface GameSelectorProps {
    selectedGames: string[];
    onChange: (games: string[]) => void;
    compact?: boolean;
}

const GameSelector: React.FC<GameSelectorProps> = ({ selectedGames, onChange, compact = false }) => {
    const toggleGame = (gameId: string) => {
        if (selectedGames.includes(gameId)) {
            onChange(selectedGames.filter((id) => id !== gameId));
        } else {
            onChange([...selectedGames, gameId]);
        }
    };

    const selectAll = () => {
        onChange(AVAILABLE_GAMES.map((g) => g.id));
    };

    const clearAll = () => {
        onChange([]);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                    {selectedGames.length === 0
                        ? 'Select one or more games'
                        : `${selectedGames.length} game${selectedGames.length === 1 ? '' : 's'} selected`}
                </span>
                <div className="flex gap-3 text-xs">
                    <button
                        type="button"
                        onClick={selectAll}
                        className="text-blue-600 font-semibold hover:underline cursor-pointer"
                    >
                        Select All
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                        type="button"
                        onClick={clearAll}
                        className="text-gray-500 hover:text-gray-800 cursor-pointer"
                    >
                        Clear
                    </button>
                </div>
            </div>

            <div className={`grid gap-3 ${compact ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2'}`}>
                {AVAILABLE_GAMES.map((game) => {
                    const isSelected = selectedGames.includes(game.id);
                    return (
                        <button
                            key={game.id}
                            type="button"
                            onClick={() => toggleGame(game.id)}
                            className={`p-4 rounded-xl border-2 text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${
                                isSelected
                                    ? 'border-blue-600 bg-blue-50/60 shadow-sm ring-1 ring-blue-600'
                                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50'
                            }`}
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span
                                        className={`px-2 py-0.5 text-xs font-bold rounded border ${game.badgeColor}`}
                                    >
                                        {game.badge}
                                    </span>
                                    <h4 className="font-bold text-gray-900 text-sm truncate">{game.name}</h4>
                                </div>
                                {!compact && (
                                    <p className="text-xs text-gray-500 line-clamp-1">{game.description}</p>
                                )}
                            </div>
                            <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                    isSelected
                                        ? 'bg-blue-600 text-white'
                                        : 'border border-gray-300 bg-white'
                                }`}
                            >
                                {isSelected && <Check size={13} strokeWidth={3} />}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default GameSelector;
