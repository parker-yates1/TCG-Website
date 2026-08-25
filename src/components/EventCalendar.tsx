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
        <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-md p-6 border border-gray-100 dark:border-white/10 transition-colors duration-300">
            <div className="flex items-center justify-between mb-6">
                <button 
                    onClick={prevMonth}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition text-gray-600 dark:text-gray-300 cursor-pointer"
                >
                    &larr;
                </button>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <button 
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition text-gray-600 dark:text-gray-300 cursor-pointer"
                >
                    &rarr;
                </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                    <div key={day} className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 py-2">
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
                                ${isSelected 
                                    ? 'bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 text-white shadow-md scale-110' 
                                    : 'hover:bg-blue-50 dark:hover:bg-white/10'}
                                ${isToday && !isSelected 
                                    ? 'text-blue-600 dark:text-violet-400 font-extrabold border-2 border-blue-200 dark:border-violet-500/50' 
                                    : !isSelected ? 'text-gray-700 dark:text-gray-300' : ''}
                                ${hasEvent && !isSelected ? 'font-bold' : ''}
                            `}
                        >
                            {dayNumber}
                            {hasEvent && (
                                <span className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-orange-500 dark:bg-violet-400'}`}></span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default EventCalendar;
