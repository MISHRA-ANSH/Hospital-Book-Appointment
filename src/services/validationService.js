import { isSlotInPast, validateAppointmentBooking, canCancelAppointment, canRescheduleAppointment } from '../utils/validationRules';

export const validateBooking = (doctorId, date, time, appointments, doctor) => {
    const errors = [];

    if (!doctor) {
        errors.push('Doctor not found');
    }

    if (!doctor?.isAvailable) {
        errors.push('Doctor is currently unavailable');
    }

    if (isSlotInPast(date, time)) {
        errors.push('Cannot book appointments in the past');
    }

    if (!validateAppointmentBooking(doctorId, date, time, appointments)) {
        errors.push('This time slot is already booked');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const validateCancellation = (appointment) => {
    const errors = [];

    if (!canCancelAppointment(appointment)) {
        errors.push(`Cannot cancel appointment with status: ${appointment.status}`);
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const validateReschedule = (appointment, newDate, newTime, appointments) => {
    const errors = [];

    if (!canRescheduleAppointment(appointment)) {
        errors.push(`Cannot reschedule appointment with status: ${appointment.status}`);
    }

    if (isSlotInPast(newDate, newTime)) {
        errors.push('Cannot reschedule to a past time slot');
    }

    const otherAppointments = appointments.filter(apt => apt.id !== appointment.id);
    if (!validateAppointmentBooking(appointment.doctorId, newDate, newTime, otherAppointments)) {
        errors.push('New time slot is not available');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};
