import { SLOT_DURATION, WORKING_HOURS } from './constants';
import { addMinutes } from './dateUtils';

export const generateTimeSlots = (startTime = WORKING_HOURS.start, endTime = WORKING_HOURS.end) => {
    const slots = [];
    let current = startTime;

    while (current < endTime) {
        const next = addMinutes(current, SLOT_DURATION);
        slots.push({ start: current, end: next });
        current = next;
    }

    return slots;
};

export const isSlotAvailable = (slot, bookedSlots) => {
    return !bookedSlots.some(booked =>
        booked.start === slot.start && booked.end === slot.end
    );
};

export const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

export const compareTime = (time1, time2) => {
    return timeToMinutes(time1) - timeToMinutes(time2);
};
