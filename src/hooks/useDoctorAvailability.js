import { useContext } from 'react';
import { HospitalContext } from '../context/HospitalContext';
import { toggleDoctorAvailability } from '../context/actions/doctorActions';

export const useDoctorAvailability = () => {
    const context = useContext(HospitalContext);

    if (!context) {
        throw new Error('useDoctorAvailability must be used within HospitalProvider');
    }

    const { doctors, appointments, dispatchDoctors, dispatchAppointments, dispatchNotifications } = context;

    const toggleAvailability = (doctorId, isAvailable) => {
        toggleDoctorAvailability(
            dispatchDoctors,
            dispatchAppointments,
            dispatchNotifications,
            doctorId,
            isAvailable,
            appointments
        );
    };

    const getDoctorAvailability = (doctorId) => {
        const doctor = doctors.find(d => d.id === doctorId);
        return doctor?.isAvailable || false;
    };

    return {
        toggleAvailability,
        getDoctorAvailability
    };
};
