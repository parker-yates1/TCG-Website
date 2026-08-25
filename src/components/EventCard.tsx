import React from 'react';
import { MapPin, Clock, Calendar as CalendarIcon, Trophy, Coins } from 'lucide-react';
import { StoreEvent } from '../types';

interface EventCardProps {
    event: StoreEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    // Determine badge color based on game
    const getGameColor = (game: string) => {
        if (game.includes('Magic')) return 'bg-orange-100 dark:bg-orange-950/40 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800/40';
        if (game.includes('Pokémon')) return 'bg-yellow-100 dark:bg-yellow-950/40 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800/40';
        if (game.includes('Yu-Gi-Oh')) return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700';
        if (game.includes('One Piece')) return 'bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800/40';
        if (game.includes('Lorcana')) return 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/40';
        return 'bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800/40';
    };

    // Format date nicely
    const dateObj = new Date(event.date + 'T00:00:00'); // append time to avoid timezone shift
    const formattedDate = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    return (
        <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
            {event.imageUrl ? (
                <div className="h-40 w-full relative">
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-md backdrop-blur-md bg-white/90 dark:bg-[#1e293b]/90 shadow-sm border ${getGameColor(event.game)}`}>
                            {event.game}
                        </span>
                        {event.entryFee === 'Free' && (
                            <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                                FREE
                            </span>
                        )}
                    </div>
                </div>
            ) : (
                <div className="h-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-violet-600 dark:to-blue-600"></div>
            )}

            <div className="p-5">
                {!event.imageUrl && (
                    <div className="flex justify-between items-start mb-3">
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-md border ${getGameColor(event.game)}`}>
                            {event.game}
                        </span>
                        {event.entryFee === 'Free' && (
                            <span className="bg-green-100 dark:bg-green-950/40 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800/40 text-xs font-bold px-2.5 py-1 rounded-md">
                                FREE
                            </span>
                        )}
                    </div>
                )}

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 leading-tight">{event.title}</h3>
                
                <div className="flex gap-2 items-center mb-4">
                    {event.storeLogoUrl ? (
                         <img src={event.storeLogoUrl} alt={event.storeName} className="w-5 h-5 rounded-full bg-gray-100 dark:bg-white/10" />
                    ) : (
                         <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-violet-900/40 flex items-center justify-center text-blue-800 dark:text-violet-300 text-[10px] font-bold">
                             {event.storeName.charAt(0)}
                         </div>
                    )}
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{event.storeName}</span>
                </div>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <CalendarIcon className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                        <span>{formattedDate}</span>
                        <span className="mx-2">•</span>
                        <Clock className="w-4 h-4 mr-1 text-gray-400 dark:text-gray-500" />
                        <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                        <span className="truncate">{event.storeAddress}</span>
                    </div>
                    {(event.entryFee !== 'Free' && event.entryFee) && (
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Coins className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                            <span>Entry: <span className="font-medium text-gray-900 dark:text-white">{event.entryFee}</span></span>
                        </div>
                    )}
                    {event.prizeSupport && (
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Trophy className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                            <span className="truncate">Prize: {event.prizeSupport}</span>
                        </div>
                    )}
                </div>

                {event.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-4 pt-4 border-t border-gray-100 dark:border-white/10">
                        {event.description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default EventCard;
