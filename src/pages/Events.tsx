import React, { useState, useMemo } from 'react';
import { Calendar } from 'lucide-react';
import { mockEvents } from '../data/mockEvents';
import EventCalendar from '../components/EventCalendar';
import EventCard from '../components/EventCard';

const Events: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    // Filter events based on selected date, and sort them chronologically
    const filteredEvents = useMemo(() => {
        let sorted = [...mockEvents].sort((a, b) => {
            if (a.date === b.date) {
                return a.time.localeCompare(b.time);
            }
            return a.date.localeCompare(b.date);
        });

        if (selectedDate) {
            return sorted.filter(e => e.date === selectedDate);
        }
        return sorted;
    }, [selectedDate]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Local Events</h2>
                <p className="text-gray-600 dark:text-gray-400">Find trading card game tournaments, prereleases, and casual play near you.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Left Column - Calendar (Sticky) */}
                <div className="lg:col-span-1 lg:sticky lg:top-24">
                    <EventCalendar
                        events={mockEvents}
                        selectedDate={selectedDate}
                        onSelectDate={setSelectedDate}
                    />

                    {selectedDate && (
                        <div className="mt-4 flex justify-between items-center bg-blue-50 dark:bg-violet-900/20 text-blue-800 dark:text-violet-300 px-4 py-3 rounded-lg border border-blue-100 dark:border-white/10">
                            <span className="text-sm font-medium">Filtering by specific date</span>
                            <button
                                onClick={() => setSelectedDate(null)}
                                className="text-sm font-bold hover:text-blue-900 dark:hover:text-violet-200 underline decoration-blue-300 dark:decoration-violet-400 underline-offset-2 cursor-pointer"
                            >
                                Clear
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Column - Event Cards */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                            <Calendar className="w-5 h-5 mr-2 text-blue-600 dark:text-violet-400" />
                            {selectedDate
                                ? `Events on ${new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}`
                                : "Upcoming Events"
                            }
                        </h3>
                        <span className="bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 text-sm font-medium px-3 py-1 rounded-full cursor-pointer">
                            {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
                        </span>
                    </div>

                    {filteredEvents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                            {filteredEvents.map(event => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-100 dark:border-white/10 p-12 text-center transition-colors duration-300">
                            <div className="text-5xl mb-4">🗓️</div>
                            <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">No events found</h4>
                            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                                There are no events scheduled for this date. Try selecting another day or clearing your filter to see all upcoming events.
                            </p>
                            <button
                                onClick={() => setSelectedDate(null)}
                                className="mt-6 px-6 py-2 bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:from-violet-700 dark:hover:to-blue-700 transition"
                            >
                                View all events
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Events;
