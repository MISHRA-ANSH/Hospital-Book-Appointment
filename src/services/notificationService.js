import { generateId } from '../utils/helpers';
import { NOTIFICATION_TYPES } from '../utils/constants';

export const createNotification = (type, message, details = {}) => {
    return {
        id: generateId(),
        type,
        message,
        details,
        timestamp: new Date().toISOString(),
        read: false
    };
};

export const notifyAppointmentBooked = (appointment, patient, doctor) => {
    return createNotification(
        NOTIFICATION_TYPES.SUCCESS,
        `Appointment booked successfully for ${patient.firstName} with Dr. ${doctor.firstName}`,
        { appointmentId: appointment.id }
    );
};

export const notifyAppointmentCancelled = (appointment) => {
    return createNotification(
        NOTIFICATION_TYPES.WARNING,
        'Appointment has been cancelled',
        { appointmentId: appointment.id }
    );
};

export const notifyDoctorUnavailable = (doctorId, affectedAppointments) => {
    return createNotification(
        NOTIFICATION_TYPES.ERROR,
        `Doctor is now unavailable. ${affectedAppointments.length} appointments affected`,
        { doctorId, affectedCount: affectedAppointments.length }
    );
};

export const notifyQueueUpdate = (queueNumber) => {
    return createNotification(
        NOTIFICATION_TYPES.INFO,
        `Your queue number is ${queueNumber}`,
        { queueNumber }
    );
};
