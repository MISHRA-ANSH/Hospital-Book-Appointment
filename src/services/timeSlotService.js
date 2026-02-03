import { generateTimeSlots, isSlotAvailable } from '../utils/timeUtils';
import { isPast } from '../utils/dateUtils';
import { APPOINTMENT_STATUS } from '../utils/constants';

export const getAvailableSlots = (doctor, date, appointments) => {
    const allSlots = generateTimeSlots(doctor.workingHours?.start, doctor.workingHours?.end);

    const bookedSlots = appointments
        .filter(apt =>
            apt.doctorId === doctor.id &&
            apt.date === date &&
            apt.status !== APPOINTMENT_STATUS.CANCELLED
        )
        .map(apt => ({ start: apt.time, end: apt.timeEnd }));

    return allSlots
        .filter(slot => !isPast(date, slot.start))
        .map(slot => ({
            ...slot,
            available: isSlotAvailable(slot, bookedSlots)
        }));
};

export const isSlotBookable = (doctorId, date, time, appointments) => {
    if (isPast(date, time)) return false;

    const conflict = appointments.find(apt =>
        apt.doctorId === doctorId &&
        apt.date === date &&
        apt.time === time &&
        apt.status !== APPOINTMENT_STATUS.CANCELLED
    );

    return !conflict;
};
