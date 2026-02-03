import { APPOINTMENT_STATUS, STATUS_TRANSITIONS } from './constants';
import { isPast } from './dateUtils';

export const canTransitionStatus = (currentStatus, newStatus) => {
    return STATUS_TRANSITIONS[currentStatus]?.includes(newStatus) || false;
};

export const canCancelAppointment = (appointment) => {
    return appointment.status === APPOINTMENT_STATUS.BOOKED ||
        appointment.status === APPOINTMENT_STATUS.CHECKED_IN;
};

export const canRescheduleAppointment = (appointment) => {
    return appointment.status === APPOINTMENT_STATUS.BOOKED;
};

export const isSlotInPast = (date, time) => {
    return isPast(date, time);
};

export const validateAppointmentBooking = (doctorId, date, time, existingAppointments) => {
    const conflicts = existingAppointments.filter(apt =>
        apt.doctorId === doctorId &&
        apt.date === date &&
        apt.time === time &&
        apt.status !== APPOINTMENT_STATUS.CANCELLED
    );

    return conflicts.length === 0;
};
