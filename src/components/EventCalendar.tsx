import React, { useState, useMemo } from 'react';
import { StoreEvent } from '../types';

interface EventCalendarProps {
    events: StoreEvent[];
    selectedDate: string | null;
    onSelectDate: (date: string | null) => void;
}

const EventCalendar: React.FC<EventCalendarProps> = ({ events, selectedDate, onSelectDate }) => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    
    // Adjust so Monday is 0, Sunday is 6 for a standard calendar view
    const startingBlankDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    // Pre-calculate which dates have events
    const eventsByDate = useMemo(() => {
        const acc: Record<string, boolean> = {};
        events.forEach(e => {
            acc[e.date] = true;
        });
        return acc;
    }, [events]);

    const handleDayClick = (dayNumber: number) => {
        const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNumber);
        const dateString = clickedDate.toISOString().split('T')[0];
        
        if (selectedDate === dateString) {
            onSelectDate(null); // Deselect if already selected
        } else {
            onSelectDate(dateString);
        }
    };

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    return (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <button 
                    onClick={prevMonth}
                    className="p-2 hover:bg-gray-100 rounded-full transition text-gray-600 cursor-pointer"
                >
                    &larr;
                </button>
                <h3 className="text-xl font-bold text-gray-800">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <button 
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded-full transition text-gray-600 cursor-pointer"
                >
                    &rarr;
                </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                    <div key={day} className="text-center text-sm font-semibold text-gray-500 py-2">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: startingBlankDays }).map((_, i) => (
                    <div key={`blank-${i}`} className="h-10"></div>
                ))}
                
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const dayNumber = i + 1;
                    const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNumber);
                    const dateString = dateObj.toISOString().split('T')[0];
                    const hasEvent = eventsByDate[dateString];
                    const isSelected = selectedDate === dateString;
                    const isToday = today.toISOString().split('T')[0] === dateString;

                    return (
                        <button
                            key={dayNumber}
                            onClick={() => handleDayClick(dayNumber)}
                            className={`
                                h-10 w-10 mx-auto rounded-full flex items-center justify-center relative text-sm font-medium transition-all cursor-pointer
                                ${isSelected ? 'bg-blue-600 text-white shadow-md scale-110' : 'hover:bg-blue-50'}
                                ${isToday && !isSelected ? 'text-blue-600 font-extrabold border-2 border-blue-200' : 'text-gray-700'}
                                ${hasEvent && !isSelected ? 'font-bold' : ''}
                            `}
                        >
                            {dayNumber}
                            {hasEvent && (
                                <span className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-orange-500'}`}></span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default EventCalendar;
