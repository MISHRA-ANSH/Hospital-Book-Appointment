import { generateTimeSlots, isSlotAvailable } from '../utils/timeUtils';
import { isPast, formatDate } from '../utils/dateUtils';
import { APPOINTMENT_STATUS, SLOT_DURATION } from '../utils/constants';
import { generateId } from '../utils/helpers';
import { saveToLocalStorage, loadFromLocalStorage } from './persistenceService';

const TIME_SLOTS_KEY = 'hospitalTimeSlots';

// Generate daily slots for a doctor
export const generateDailySlots = (doctorId, date) => {
    const dayOfWeek = new Date(date).getDay();

    // Define working hours based on day
    let startHour = 9, endHour = 17;
    if (dayOfWeek === 6) { // Saturday
        startHour = 10;
        endHour = 14;
    } else if (dayOfWeek === 0) { // Sunday - Closed
        return [];
    }

    const slots = [];

    // Generate 30-minute slots
    for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += SLOT_DURATION) {
            // Skip lunch break (1:00 PM - 2:00 PM)
            if (hour === 13) continue;

            const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            const slotDateTime = new Date(`${date}T${time}`);

            // Skip past slots
            if (slotDateTime < new Date()) continue;

            slots.push({
                id: `${doctorId}-${date}-${time}`,
                doctorId,
                date,
                time,
                isAvailable: true,
                appointmentId: null,
                createdAt: new Date().toISOString()
            });
        }
    }

    return slots;
};

// Get or generate slots for a doctor on a specific date
export const getSlotsForDoctor = (doctorId, date) => {
    const allSlots = loadFromLocalStorage(TIME_SLOTS_KEY, []);
    let doctorSlots = allSlots.filter(slot =>
        slot.doctorId === doctorId && slot.date === date
    );

    // If no slots exist, generate them
    if (doctorSlots.length === 0) {
        doctorSlots = generateDailySlots(doctorId, date);
        const updatedSlots = [...allSlots, ...doctorSlots];
        saveToLocalStorage(TIME_SLOTS_KEY, updatedSlots);
    }

    return doctorSlots;
};

// Get available slots (not booked)
export const getAvailableSlots = (doctorId, date) => {
    const slots = getSlotsForDoctor(doctorId, date);
    return slots.filter(slot => slot.isAvailable);
};

// Mark slot as booked
export const markSlotAsBooked = (slotId, appointmentId) => {
    const allSlots = loadFromLocalStorage(TIME_SLOTS_KEY, []);
    const updatedSlots = allSlots.map(slot =>
        slot.id === slotId
            ? { ...slot, isAvailable: false, appointmentId }
            : slot
    );
    saveToLocalStorage(TIME_SLOTS_KEY, updatedSlots);
    return updatedSlots.find(s => s.id === slotId);
};

// Free up a slot (when appointment is cancelled)
export const freeSlot = (slotId) => {
    const allSlots = loadFromLocalStorage(TIME_SLOTS_KEY, []);
    const updatedSlots = allSlots.map(slot =>
        slot.id === slotId
            ? { ...slot, isAvailable: true, appointmentId: null }
            : slot
    );
    saveToLocalStorage(TIME_SLOTS_KEY, updatedSlots);
    return updatedSlots.find(s => s.id === slotId);
};

// Check if a specific slot is bookable
export const isSlotBookable = (slotId) => {
    const allSlots = loadFromLocalStorage(TIME_SLOTS_KEY, []);
    const slot = allSlots.find(s => s.id === slotId);

    if (!slot) return false;
    if (!slot.isAvailable) return false;
    if (isPast(slot.date, slot.time)) return false;

    return true;
};

// Get slot by ID
export const getSlotById = (slotId) => {
    const allSlots = loadFromLocalStorage(TIME_SLOTS_KEY, []);
    return allSlots.find(slot => slot.id === slotId);
};

// Initialize slots for next 7 days for all doctors
export const initializeSlotsForDoctors = (doctors) => {
    const today = new Date();
    const slots = [];

    doctors.forEach(doctor => {
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() + i);
            const dateStr = formatDate(date);
            const dailySlots = generateDailySlots(doctor.id, dateStr);
            slots.push(...dailySlots);
        }
    });

    saveToLocalStorage(TIME_SLOTS_KEY, slots);
    return slots;
};
