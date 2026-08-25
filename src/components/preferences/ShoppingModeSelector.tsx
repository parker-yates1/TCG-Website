import React from 'react';
import { ShoppingMode } from '../../types';
import { Store, Globe, Layers, Tag, CheckCircle2 } from 'lucide-react';

export interface ShoppingOption {
    id: ShoppingMode;
    title: string;
    description: string;
    badge: string;
    icon: React.ComponentType<{ className?: string }>;
}

export const SHOPPING_OPTIONS: ShoppingOption[] = [
    {
        id: 'local_only',
        title: 'Local Stores Exclusively',
        description: 'Prioritize pickups and inventory strictly from verified local game stores in your area.',
        badge: 'Local First',
        icon: Store,
    },
    {
        id: 'mix',
        title: 'Mix of Local & Online',
        description: 'Check your favorite local game stores first, with seamless fallback to online sellers for missing singles.',
        badge: 'Recommended',
        icon: Layers,
    },
    {
        id: 'online_only',
        title: 'Online Exclusively',
        description: 'Browse nationwide verified online retailers, direct collectors, and rapid home mail delivery.',
        badge: 'Nationwide Delivery',
        icon: Globe,
    },
    {
        id: 'cheapest',
        title: 'Cheapest Price Regardless',
        description: 'Always surface the lowest total price (including estimated shipping or local pickup) anywhere.',
        badge: 'Best Value',
        icon: Tag,
    },
];

interface ShoppingModeSelectorProps {
    selectedMode: ShoppingMode | null;
    onChange: (mode: ShoppingMode) => void;
    compact?: boolean;
}

const ShoppingModeSelector: React.FC<ShoppingModeSelectorProps> = ({
    selectedMode,
    onChange,
    compact = false,
}) => {
    return (
        <div className="space-y-3">
            <div className={`grid gap-3 ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
                {SHOPPING_OPTIONS.map((option) => {
                    const isSelected = selectedMode === option.id;
                    const Icon = option.icon;

                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => onChange(option.id)}
                            className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between cursor-pointer relative ${
                                isSelected
                                    ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-600'
                                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50'
                            }`}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                            isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span
                                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                            isSelected
                                                ? 'bg-blue-200 text-blue-900'
                                                : 'bg-gray-100 text-gray-600'
                                        }`}
                                    >
                                        {option.badge}
                                    </span>
                                </div>
                                <h4 className="font-bold text-gray-900 text-base mb-1">{option.title}</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">{option.description}</p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                                <span className={`text-xs font-semibold ${isSelected ? 'text-blue-700' : 'text-gray-400'}`}>
                                    {isSelected ? 'Selected option' : 'Click to select'}
                                </span>
                                <div
                                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                        isSelected ? 'text-blue-600' : 'text-gray-300'
                                    }`}
                                >
                                    <CheckCircle2
                                        size={20}
                                        className={isSelected ? 'fill-blue-600 text-white' : 'text-gray-300'}
                                    />
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ShoppingModeSelector;
