import { assignQueueNumber, reorderQueue, removeFromQueue } from '../utils/queueUtils';
import { APPOINTMENT_STATUS } from '../utils/constants';

export const addToQueue = (appointment, currentQueue) => {
    const queueNumber = assignQueueNumber(currentQueue);
    const queueItem = {
        appointmentId: appointment.id,
        patientId: appointment.patientId,
        doctorId: appointment.doctorId,
        queueNumber,
        status: appointment.status,
        checkedInAt: new Date().toISOString()
    };

    return [...currentQueue, queueItem];
};

export const updateQueueStatus = (appointmentId, status, queue) => {
    return queue.map(item =>
        item.appointmentId === appointmentId
            ? { ...item, status }
            : item
    );
};

export const removeAndReorder = (appointmentId, queue) => {
    const filtered = removeFromQueue(appointmentId, queue);
    return reorderQueue(filtered);
};

export const getQueueByDoctor = (doctorId, queue) => {
    return queue
        .filter(item => item.doctorId === doctorId)
        .sort((a, b) => a.queueNumber - b.queueNumber);
};

export const getActiveQueue = (queue) => {
    return queue.filter(item =>
        item.status !== APPOINTMENT_STATUS.COMPLETED &&
        item.status !== APPOINTMENT_STATUS.CANCELLED
    );
};
