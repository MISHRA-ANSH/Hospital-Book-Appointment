import { useContext } from 'react';
import { HospitalContext } from '../context/HospitalContext';
import { getAvailableSlots, isSlotBookable } from '../services/timeSlotService';

export const useTimeSlots = () => {
    const context = useContext(HospitalContext);

    if (!context) {
        throw new Error('useTimeSlots must be used within HospitalProvider');
    }

    const { doctors, appointments } = context;

    const getSlots = (doctorId, date) => {
        const doctor = doctors.find(d => d.id === doctorId);
        if (!doctor) return [];

        return getAvailableSlots(doctor, date, appointments);
    };

    const checkSlotAvailability = (doctorId, date, time) => {
        return isSlotBookable(doctorId, date, time, appointments);
    };

    return {
        getSlots,
        checkSlotAvailability
    };
};
