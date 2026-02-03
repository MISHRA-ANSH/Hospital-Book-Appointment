export const APPOINTMENT_ACTIONS = {
    BOOK_APPOINTMENT: 'BOOK_APPOINTMENT',
    UPDATE_STATUS: 'UPDATE_STATUS',
    CANCEL_APPOINTMENT: 'CANCEL_APPOINTMENT',
    RESCHEDULE_APPOINTMENT: 'RESCHEDULE_APPOINTMENT',
    SET_APPOINTMENTS: 'SET_APPOINTMENTS',
    BULK_CANCEL: 'BULK_CANCEL'
};

export const appointmentsReducer = (state, action) => {
    switch (action.type) {
        case APPOINTMENT_ACTIONS.BOOK_APPOINTMENT:
            return [...state, action.payload];

        case APPOINTMENT_ACTIONS.UPDATE_STATUS:
            return state.map(apt =>
                apt.id === action.payload.appointmentId
                    ? { ...apt, status: action.payload.status, updatedAt: new Date().toISOString() }
                    : apt
            );

        case APPOINTMENT_ACTIONS.CANCEL_APPOINTMENT:
            return state.map(apt =>
                apt.id === action.payload
                    ? { ...apt, status: 'CANCELLED', updatedAt: new Date().toISOString() }
                    : apt
            );

        case APPOINTMENT_ACTIONS.RESCHEDULE_APPOINTMENT:
            return state.map(apt =>
                apt.id === action.payload.appointmentId
                    ? {
                        ...apt,
                        date: action.payload.date,
                        time: action.payload.time,
                        timeEnd: action.payload.timeEnd,
                        updatedAt: new Date().toISOString()
                    }
                    : apt
            );

        case APPOINTMENT_ACTIONS.BULK_CANCEL:
            return state.map(apt =>
                action.payload.appointmentIds.includes(apt.id)
                    ? { ...apt, status: 'CANCELLED', updatedAt: new Date().toISOString() }
                    : apt
            );

        case APPOINTMENT_ACTIONS.SET_APPOINTMENTS:
            return action.payload;

        default:
            return state;
    }
};
