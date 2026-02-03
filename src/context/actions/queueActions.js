import { QUEUE_ACTIONS } from '../reducers/queueReducer';
import { addToQueue, updateQueueStatus, removeAndReorder } from '../../services/queueService';

export const addAppointmentToQueue = (dispatch, appointment, currentQueue) => {
    const updatedQueue = addToQueue(appointment, currentQueue);
    const newItem = updatedQueue[updatedQueue.length - 1];

    dispatch({ type: QUEUE_ACTIONS.ADD_TO_QUEUE, payload: newItem });
    return newItem;
};

export const updateQueueItemStatus = (dispatch, appointmentId, status, queue) => {
    dispatch({
        type: QUEUE_ACTIONS.UPDATE_QUEUE_STATUS,
        payload: { appointmentId, status }
    });
};

export const removeFromQueueAndReorder = (dispatch, appointmentId, queue) => {
    const reorderedQueue = removeAndReorder(appointmentId, queue);
    dispatch({ type: QUEUE_ACTIONS.REORDER_QUEUE, payload: reorderedQueue });
};
