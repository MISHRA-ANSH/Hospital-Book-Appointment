import { APPOINTMENT_ACTIONS } from '../reducers/appointmentsReducer';
import { createAppointment } from '../../services/appointmentService';
import { validateBooking, validateCancellation, validateReschedule } from '../../services/validationService';

export const bookAppointment = (dispatch, patientId, doctorId, date, time, timeEnd, appointments, doctor) => {
    const validation = validateBooking(doctorId, date, time, appointments, doctor);

    if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
    }

    const appointment = createAppointment(patientId, doctorId, date, time, timeEnd);
    dispatch({ type: APPOINTMENT_ACTIONS.BOOK_APPOINTMENT, payload: appointment });

    return appointment;
};

export const updateAppointmentStatus = (dispatch, appointmentId, status) => {
    dispatch({
        type: APPOINTMENT_ACTIONS.UPDATE_STATUS,
        payload: { appointmentId, status }
    });
};

export const cancelAppointment = (dispatch, appointmentId, appointment) => {
    const validation = validateCancellation(appointment);

    if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
    }

    dispatch({ type: APPOINTMENT_ACTIONS.CANCEL_APPOINTMENT, payload: appointmentId });
};

export const rescheduleAppointment = (dispatch, appointmentId, newDate, newTime, newTimeEnd, appointment, appointments) => {
    const validation = validateReschedule(appointment, newDate, newTime, appointments);

    if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
    }

    dispatch({
        type: APPOINTMENT_ACTIONS.RESCHEDULE_APPOINTMENT,
        payload: { appointmentId, date: newDate, time: newTime, timeEnd: newTimeEnd }
    });
};
