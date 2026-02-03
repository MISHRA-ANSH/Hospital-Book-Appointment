export const QUEUE_ACTIONS = {
    ADD_TO_QUEUE: 'ADD_TO_QUEUE',
    UPDATE_QUEUE_STATUS: 'UPDATE_QUEUE_STATUS',
    REMOVE_FROM_QUEUE: 'REMOVE_FROM_QUEUE',
    REORDER_QUEUE: 'REORDER_QUEUE',
    SET_QUEUE: 'SET_QUEUE',
    CLEAR_QUEUE: 'CLEAR_QUEUE'
};

export const queueReducer = (state, action) => {
    switch (action.type) {
        case QUEUE_ACTIONS.ADD_TO_QUEUE:
            return [...state, action.payload];

        case QUEUE_ACTIONS.UPDATE_QUEUE_STATUS:
            return state.map(item =>
                item.appointmentId === action.payload.appointmentId
                    ? { ...item, status: action.payload.status }
                    : item
            );

        case QUEUE_ACTIONS.REMOVE_FROM_QUEUE:
            return state.filter(item => item.appointmentId !== action.payload);

        case QUEUE_ACTIONS.REORDER_QUEUE:
            return action.payload;

        case QUEUE_ACTIONS.SET_QUEUE:
            return action.payload;

        case QUEUE_ACTIONS.CLEAR_QUEUE:
            return [];

        default:
            return state;
    }
};
