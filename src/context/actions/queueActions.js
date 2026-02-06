import { QUEUE_ACTIONS } from '../reducers/queueReducer';
import { addToQueue, updateQueueStatus, removeAndReorder } from '../../services/queueService';

export const addAppointmentToQueue = (dispatch, appointment) => {
    const queueItem = addToQueue(appointment);

    dispatch({ type: QUEUE_ACTIONS.ADD_TO_QUEUE, payload: queueItem });
    return queueItem;
};

export const updateQueueItemStatus = (dispatch, appointmentId, status) => {
    const updatedItem = updateQueueStatus(appointmentId, status);
    dispatch({
        type: QUEUE_ACTIONS.UPDATE_QUEUE_STATUS,
        payload: { appointmentId, status }
    });
    return updatedItem;
};

export const removeFromQueueAndReorder = (dispatch, appointmentId, doctorId, date) => {
    const reorderedQueue = removeAndReorder(appointmentId, doctorId, date);
    dispatch({ type: QUEUE_ACTIONS.REORDER_QUEUE, payload: reorderedQueue });
    return reorderedQueue;
};
