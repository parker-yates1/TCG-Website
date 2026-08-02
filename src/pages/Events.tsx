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
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Local Events</h2>
                <p className="text-gray-600">Find trading card game tournaments, prereleases, and casual play near you.</p>
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
                        <div className="mt-4 flex justify-between items-center bg-blue-50 text-blue-800 px-4 py-3 rounded-lg border border-blue-100">
                            <span className="text-sm font-medium">Filtering by specific date</span>
                            <button
                                onClick={() => setSelectedDate(null)}
                                className="text-sm font-bold hover:text-blue-900 underline decoration-blue-300 underline-offset-2 cursor-pointer"
                            >
                                Clear
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Column - Event Cards */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center">
                            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                            {selectedDate
                                ? `Events on ${new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}`
                                : "Upcoming Events"
                            }
                        </h3>
                        <span className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full cursor-pointer">
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
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                            <div className="text-5xl mb-4">🗓️</div>
                            <h4 className="text-lg font-bold text-gray-800 mb-2">No events found</h4>
                            <p className="text-gray-500 max-w-sm mx-auto">
                                There are no events scheduled for this date. Try selecting another day or clearing your filter to see all upcoming events.
                            </p>
                            <button
                                onClick={() => setSelectedDate(null)}
                                className="mt-6 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
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
