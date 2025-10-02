'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface BookingCalendarProps {
  onDateSelect: (date: Date, timeSlot: string) => void;
  selectedDate?: Date;
  selectedTimeSlot?: string;
  serviceType?: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
  label: string;
}

const TIME_SLOTS: TimeSlot[] = [
  { time: '09:00', available: true, label: '9:00 AM' },
  { time: '10:00', available: true, label: '10:00 AM' },
  { time: '11:00', available: true, label: '11:00 AM' },
  { time: '13:00', available: true, label: '1:00 PM' },
  { time: '14:00', available: true, label: '2:00 PM' },
  { time: '15:00', available: true, label: '3:00 PM' },
  { time: '16:00', available: true, label: '4:00 PM' },
  { time: '17:00', available: true, label: '5:00 PM' }
];

// Mock unavailable dates (in a real app, this would come from an API)
const UNAVAILABLE_DATES = [
  '2024-12-25', // Christmas
  '2024-12-31', // New Year's Eve
  '2024-01-01', // New Year's Day
];

export function BookingCalendar({ 
  onDateSelect, 
  selectedDate, 
  selectedTimeSlot, 
  serviceType 
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDates, setCalendarDates] = useState<Date[]>([]);

  useEffect(() => {
    generateCalendarDates();
  }, [currentMonth]);

  const generateCalendarDates = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get first day of the month and how many days in the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Get the day of the week for the first day (0 = Sunday)
    const startingDayOfWeek = firstDay.getDay();
    
    const dates: Date[] = [];
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      dates.push(new Date(year, month, -startingDayOfWeek + i + 1));
    }
    
    // Add all days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(new Date(year, month, day));
    }
    
    // Add days from next month to fill the grid (6 rows × 7 days = 42 total)
    const remainingSlots = 42 - dates.length;
    for (let day = 1; day <= remainingSlots; day++) {
      dates.push(new Date(year, month + 1, day));
    }
    
    setCalendarDates(dates);
  };

  const isDateAvailable = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Can't book dates in the past
    if (date < today) return false;
    
    // Check if date is in unavailable dates list
    const dateString = date.toISOString().split('T')[0];
    if (dateString && UNAVAILABLE_DATES.includes(dateString)) return false;
    
    // Don't allow booking too far in advance (6 months)
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 6);
    if (date > maxDate) return false;
    
    return true;
  };

  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentMonth.getMonth() && 
           date.getFullYear() === currentMonth.getFullYear();
  };

  const isSelectedDate = (date: Date): boolean => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const handleDateClick = (date: Date) => {
    if (!isDateAvailable(date) || !isCurrentMonth(date)) return;
    onDateSelect(date, selectedTimeSlot || '');
  };

  const handleTimeSlotClick = (timeSlot: string) => {
    if (!selectedDate) return;
    onDateSelect(selectedDate, timeSlot);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Date</h3>
          <p className="text-sm text-gray-600">
            Choose your preferred session date. Available dates are highlighted.
          </p>
        </div>

        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('prev')}
            disabled={currentMonth <= new Date()}
          >
            ←
          </Button>
          <h4 className="text-lg font-semibold">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h4>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('next')}
          >
            →
          </Button>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDates.map((date, index) => {
            const isAvailable = isDateAvailable(date);
            const isCurrentMonthDate = isCurrentMonth(date);
            const isSelected = isSelectedDate(date);

            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                disabled={!isAvailable || !isCurrentMonthDate}
                className={cn(
                  'p-2 text-sm rounded-md transition-colors',
                  'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
                  {
                    'text-gray-300': !isCurrentMonthDate,
                    'text-gray-400 cursor-not-allowed': !isAvailable && isCurrentMonthDate,
                    'text-gray-900 hover:bg-blue-50': isAvailable && isCurrentMonthDate && !isSelected,
                    'bg-blue-600 text-white hover:bg-blue-700': isSelected,
                    'bg-gray-100': !isAvailable && isCurrentMonthDate
                  }
                )}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4 text-xs text-gray-500">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-600 rounded mr-2"></div>
            Selected
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white border border-gray-300 rounded mr-2"></div>
            Available
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-100 rounded mr-2"></div>
            Unavailable
          </div>
        </div>
      </Card>

      {/* Time slots */}
      {selectedDate && (
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Time</h3>
            <p className="text-sm text-gray-600">
              Available time slots for {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TIME_SLOTS.map(slot => (
              <button
                key={slot.time}
                onClick={() => handleTimeSlotClick(slot.time)}
                disabled={!slot.available}
                className={cn(
                  'p-3 text-sm rounded-md border transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500',
                  {
                    'border-gray-300 text-gray-700 hover:bg-gray-50': slot.available && selectedTimeSlot !== slot.time,
                    'border-blue-600 bg-blue-600 text-white': selectedTimeSlot === slot.time,
                    'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50': !slot.available
                  }
                )}
              >
                {slot.label}
              </button>
            ))}
          </div>

          {serviceType === 'pet' && (
            <div className="mt-4 p-4 bg-amber-50 rounded-lg">
              <h4 className="font-medium text-amber-900 mb-2">Pet Photography Scheduling Tips:</h4>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• Morning sessions (9-11 AM) often work best for energetic pets</li>
                <li>• Afternoon sessions (2-4 PM) are great for calmer, older pets</li>
                <li>• Consider your pet's feeding and nap schedule</li>
                <li>• Allow extra time for pets to get comfortable</li>
              </ul>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}