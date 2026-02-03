import { useContext } from 'react';
import { HospitalContext } from '../context/HospitalContext';
import { addAppointmentToQueue, updateQueueItemStatus, removeFromQueueAndReorder } from '../context/actions/queueActions';
import { getQueueByDoctor, getActiveQueue } from '../services/queueService';

export const useQueue = () => {
    const context = useContext(HospitalContext);

    if (!context) {
        throw new Error('useQueue must be used within HospitalProvider');
    }

    const { queue, dispatchQueue } = context;

    const addToQueue = (appointment) => {
        return addAppointmentToQueue(dispatchQueue, appointment, queue);
    };

    const updateStatus = (appointmentId, status) => {
        updateQueueItemStatus(dispatchQueue, appointmentId, status, queue);
    };

    const removeFromQueue = (appointmentId) => {
        removeFromQueueAndReorder(dispatchQueue, appointmentId, queue);
    };

    const getByDoctor = (doctorId) => {
        return getQueueByDoctor(doctorId, queue);
    };

    const getActive = () => {
        return getActiveQueue(queue);
    };

    return {
        queue,
        addToQueue,
        updateStatus,
        removeFromQueue,
        getByDoctor,
        getActive
    };
};
