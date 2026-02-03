import { DOCTOR_ACTIONS } from '../reducers/doctorsReducer';
import { APPOINTMENT_ACTIONS } from '../reducers/appointmentsReducer';
import { APPOINTMENT_STATUS } from '../../utils/constants';

export const toggleDoctorAvailability = (
    dispatchDoctors,
    dispatchAppointments,
    dispatchNotifications,
    doctorId,
    isAvailable,
    appointments
) => {
    dispatchDoctors({
        type: DOCTOR_ACTIONS.TOGGLE_AVAILABILITY,
        payload: { doctorId, isAvailable }
    });

    if (!isAvailable) {
        const affectedAppointments = appointments.filter(
            apt => apt.doctorId === doctorId &&
                apt.status === APPOINTMENT_STATUS.BOOKED
        );

        if (affectedAppointments.length > 0) {
            dispatchAppointments({
                type: APPOINTMENT_ACTIONS.BULK_CANCEL,
                payload: { appointmentIds: affectedAppointments.map(apt => apt.id) }
            });
        }
    }
};
