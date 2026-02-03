export const assignQueueNumber = (existingQueue) => {
    if (!existingQueue || existingQueue.length === 0) return 1;
    const maxNumber = Math.max(...existingQueue.map(item => item.queueNumber));
    return maxNumber + 1;
};

export const reorderQueue = (queue) => {
    return queue
        .filter(item => item.status !== 'COMPLETED' && item.status !== 'CANCELLED')
        .sort((a, b) => a.queueNumber - b.queueNumber)
        .map((item, index) => ({ ...item, queueNumber: index + 1 }));
};

export const getQueuePosition = (appointmentId, queue) => {
    const index = queue.findIndex(item => item.appointmentId === appointmentId);
    return index >= 0 ? index + 1 : null;
};

export const removeFromQueue = (appointmentId, queue) => {
    return queue.filter(item => item.appointmentId !== appointmentId);
};
