import React from 'react';
import './TimeSlotPicker.css';

export const TimeSlotPicker = ({ slots, selectedSlot, onSelectSlot }) => {
    return (
        <div className="time-slot-picker">
            {slots.map((slot, index) => (
                <button
                    key={index}
                    className={`time-slot ${!slot.available ? 'disabled' : ''} ${selectedSlot === slot.start ? 'selected' : ''}`}
                    onClick={() => slot.available && onSelectSlot(slot)}
                    disabled={!slot.available}
                >
                    {slot.start}
                </button>
            ))}
        </div>
    );
};
