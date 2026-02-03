import { useContext } from 'react';
import { HospitalContext } from '../context/HospitalContext';
import { bookAppointment, updateAppointmentStatus, cancelAppointment, rescheduleAppointment } from '../context/actions/appointmentActions';

export const useAppointments = () => {
    const context = useContext(HospitalContext);

    if (!context) {
        throw new Error('useAppointments must be used within HospitalProvider');
    }

    const { appointments, dispatchAppointments, doctors } = context;

    const book = (patientId, doctorId, date, time, timeEnd) => {
        const doctor = doctors.find(d => d.id === doctorId);
        return bookAppointment(dispatchAppointments, patientId, doctorId, date, time, timeEnd, appointments, doctor);
    };

    const updateStatus = (appointmentId, status) => {
        updateAppointmentStatus(dispatchAppointments, appointmentId, status);
    };

    const cancel = (appointmentId) => {
        const appointment = appointments.find(apt => apt.id === appointmentId);
        cancelAppointment(dispatchAppointments, appointmentId, appointment);
    };

    const reschedule = (appointmentId, newDate, newTime, newTimeEnd) => {
        const appointment = appointments.find(apt => apt.id === appointmentId);
        rescheduleAppointment(dispatchAppointments, appointmentId, newDate, newTime, newTimeEnd, appointment, appointments);
    };

    return {
        appointments,
        book,
        updateStatus,
        cancel,
        reschedule
    };
};
