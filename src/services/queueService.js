import { assignQueueNumber, reorderQueue, removeFromQueue } from '../utils/queueUtils';
import { APPOINTMENT_STATUS } from '../utils/constants';
import { saveToLocalStorage, loadFromLocalStorage } from './persistenceService';

const QUEUE_KEY = 'hospitalQueue';

// Get all queue data
export const getAllQueues = () => {
    return loadFromLocalStorage(QUEUE_KEY, []);
};

// Get next queue number for a doctor on a specific date
export const getNextQueueNumber = (doctorId, date) => {
    const allQueues = getAllQueues();
    const doctorQueue = allQueues.filter(item =>
        item.doctorId === doctorId &&
        item.date === date &&
        item.status !== APPOINTMENT_STATUS.CANCELLED &&
        item.status !== APPOINTMENT_STATUS.COMPLETED
    );

    if (doctorQueue.length === 0) return 1;

    const maxQueueNumber = Math.max(...doctorQueue.map(item => item.queueNumber));
    return maxQueueNumber + 1;
};

// Add appointment to queue
export const addToQueue = (appointment) => {
    const allQueues = getAllQueues();

    const queueItem = {
        id: `queue-${appointment.id}`,
        appointmentId: appointment.id,
        patientId: appointment.patientId,
        patientName: appointment.patientName,
        doctorId: appointment.doctorId,
        date: appointment.date,
        timeSlot: appointment.timeSlot,
        queueNumber: appointment.queueNumber,
        status: appointment.status,
        createdAt: new Date().toISOString()
    };

    const updatedQueues = [...allQueues, queueItem];
    saveToLocalStorage(QUEUE_KEY, updatedQueues);

    return queueItem;
};

// Update queue item status
export const updateQueueStatus = (appointmentId, status) => {
    const allQueues = getAllQueues();
    const updatedQueues = allQueues.map(item =>
        item.appointmentId === appointmentId
            ? { ...item, status, updatedAt: new Date().toISOString() }
            : item
    );
    saveToLocalStorage(QUEUE_KEY, updatedQueues);
    return updatedQueues.find(item => item.appointmentId === appointmentId);
};

// Remove from queue and reorder
export const removeAndReorder = (appointmentId, doctorId, date) => {
    const allQueues = getAllQueues();

    // Find the cancelled item's queue number
    const cancelledItem = allQueues.find(item => item.appointmentId === appointmentId);
    if (!cancelledItem) return allQueues;

    const cancelledQueueNumber = cancelledItem.queueNumber;

    // Remove the cancelled item
    let updatedQueues = allQueues.filter(item => item.appointmentId !== appointmentId);

    // Reorder remaining items for the same doctor and date
    updatedQueues = updatedQueues.map(item => {
        if (item.doctorId === doctorId &&
            item.date === date &&
            item.queueNumber > cancelledQueueNumber &&
            item.status !== APPOINTMENT_STATUS.CANCELLED &&
            item.status !== APPOINTMENT_STATUS.COMPLETED) {
            return { ...item, queueNumber: item.queueNumber - 1 };
        }
        return item;
    });

    saveToLocalStorage(QUEUE_KEY, updatedQueues);
    return updatedQueues;
};

// Get queue for a specific doctor and date
export const getQueueByDoctorAndDate = (doctorId, date) => {
    const allQueues = getAllQueues();
    return allQueues
        .filter(item =>
            item.doctorId === doctorId &&
            item.date === date &&
            item.status !== APPOINTMENT_STATUS.CANCELLED &&
            item.status !== APPOINTMENT_STATUS.COMPLETED
        )
        .sort((a, b) => a.queueNumber - b.queueNumber);
};

// Get active queue (not completed or cancelled)
export const getActiveQueue = (doctorId, date) => {
    return getQueueByDoctorAndDate(doctorId, date);
};

// Get queue position for an appointment
export const getQueuePosition = (appointmentId) => {
    const allQueues = getAllQueues();
    const queueItem = allQueues.find(item => item.appointmentId === appointmentId);

    if (!queueItem) return null;

    // Get all active items for the same doctor and date
    const activeQueue = getQueueByDoctorAndDate(queueItem.doctorId, queueItem.date);
    const position = activeQueue.findIndex(item => item.appointmentId === appointmentId);

    return position >= 0 ? position + 1 : null;
};

// Get queue by doctor (all dates)
export const getQueueByDoctor = (doctorId) => {
    const allQueues = getAllQueues();
    return allQueues
        .filter(item => item.doctorId === doctorId)
        .sort((a, b) => {
            // Sort by date first, then by queue number
            if (a.date !== b.date) {
                return new Date(a.date) - new Date(b.date);
            }
            return a.queueNumber - b.queueNumber;
        });
};
