export const NOTIFICATION_ACTIONS = {
    ADD_NOTIFICATION: 'ADD_NOTIFICATION',
    MARK_AS_READ: 'MARK_AS_READ',
    REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
    CLEAR_ALL: 'CLEAR_ALL'
};

export const notificationsReducer = (state, action) => {
    switch (action.type) {
        case NOTIFICATION_ACTIONS.ADD_NOTIFICATION:
            return [action.payload, ...state];

        case NOTIFICATION_ACTIONS.MARK_AS_READ:
            return state.map(notif =>
                notif.id === action.payload ? { ...notif, read: true } : notif
            );

        case NOTIFICATION_ACTIONS.REMOVE_NOTIFICATION:
            return state.filter(notif => notif.id !== action.payload);

        case NOTIFICATION_ACTIONS.CLEAR_ALL:
            return [];

        default:
            return state;
    }
};
