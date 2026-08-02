import React from 'react';
import { MapPin, Clock, Calendar as CalendarIcon, Trophy, Coins } from 'lucide-react';
import { StoreEvent } from '../types';

interface EventCardProps {
    event: StoreEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    // Determine badge color based on game
    const getGameColor = (game: string) => {
        if (game.includes('Magic')) return 'bg-orange-100 text-orange-800 border-orange-200';
        if (game.includes('Pokémon')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        if (game.includes('Yu-Gi-Oh')) return 'bg-slate-100 text-slate-800 border-slate-200';
        if (game.includes('One Piece')) return 'bg-red-100 text-red-800 border-red-200';
        if (game.includes('Lorcana')) return 'bg-indigo-100 text-indigo-800 border-indigo-200';
        return 'bg-blue-100 text-blue-800 border-blue-200';
    };

    // Format date nicely
    const dateObj = new Date(event.date + 'T00:00:00'); // append time to avoid timezone shift
    const formattedDate = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
            {event.imageUrl ? (
                <div className="h-40 w-full relative">
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-md backdrop-blur-md bg-white/90 shadow-sm ${getGameColor(event.game)}`}>
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
                <div className="h-4 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            )}

            <div className="p-5">
                {!event.imageUrl && (
                    <div className="flex justify-between items-start mb-3">
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-md border ${getGameColor(event.game)}`}>
                            {event.game}
                        </span>
                        {event.entryFee === 'Free' && (
                            <span className="bg-green-100 text-green-800 border border-green-200 text-xs font-bold px-2.5 py-1 rounded-md">
                                FREE
                            </span>
                        )}
                    </div>
                )}

                <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight">{event.title}</h3>
                
                <div className="flex gap-2 items-center mb-4">
                    {event.storeLogoUrl ? (
                         <img src={event.storeLogoUrl} alt={event.storeName} className="w-5 h-5 rounded-full bg-gray-100" />
                    ) : (
                         <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-[10px] font-bold">
                             {event.storeName.charAt(0)}
                         </div>
                    )}
                    <span className="text-sm font-semibold text-gray-700">{event.storeName}</span>
                </div>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{formattedDate}</span>
                        <span className="mx-2">•</span>
                        <Clock className="w-4 h-4 mr-1 text-gray-400" />
                        <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="truncate">{event.storeAddress}</span>
                    </div>
                    {(event.entryFee !== 'Free' && event.entryFee) && (
                        <div className="flex items-center text-sm text-gray-600">
                            <Coins className="w-4 h-4 mr-2 text-gray-400" />
                            <span>Entry: <span className="font-medium text-gray-900">{event.entryFee}</span></span>
                        </div>
                    )}
                    {event.prizeSupport && (
                        <div className="flex items-center text-sm text-gray-600">
                            <Trophy className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="truncate">Prize: {event.prizeSupport}</span>
                        </div>
                    )}
                </div>

                {event.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mt-4 pt-4 border-t border-gray-100">
                        {event.description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default EventCard;
