import { generateId } from '../utils/helpers';
import { APPOINTMENT_STATUS } from '../utils/constants';
import { canTransitionStatus, validateAppointmentBooking } from '../utils/validationRules';

export const createAppointment = (patientId, doctorId, date, time, timeEnd) => {
    return {
        id: generateId(),
        patientId,
        doctorId,
        date,
        time,
        timeEnd,
        status: APPOINTMENT_STATUS.BOOKED,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
};

export const updateAppointmentStatus = (appointment, newStatus) => {
    if (!canTransitionStatus(appointment.status, newStatus)) {
        throw new Error(`Cannot transition from ${appointment.status} to ${newStatus}`);
    }

    return {
        ...appointment,
        status: newStatus,
        updatedAt: new Date().toISOString()
    };
};

export const cancelAppointment = (appointment) => {
    return updateAppointmentStatus(appointment, APPOINTMENT_STATUS.CANCELLED);
};

export const rescheduleAppointment = (appointment, newDate, newTime, newTimeEnd, existingAppointments) => {
    if (!validateAppointmentBooking(appointment.doctorId, newDate, newTime, existingAppointments)) {
        throw new Error('Selected slot is not available');
    }

    return {
        ...appointment,
        date: newDate,
        time: newTime,
        timeEnd: newTimeEnd,
        updatedAt: new Date().toISOString()
    };
};

export const getAppointmentsByPatient = (patientId, appointments) => {
    return appointments.filter(apt => apt.patientId === patientId);
};

export const getAppointmentsByDoctor = (doctorId, appointments) => {
    return appointments.filter(apt => apt.doctorId === doctorId);
};

export const getTodayAppointments = (appointments, date) => {
    return appointments.filter(apt => apt.date === date);
};
