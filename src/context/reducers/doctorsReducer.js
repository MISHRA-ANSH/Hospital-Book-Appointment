export const DOCTOR_ACTIONS = {
    ADD_DOCTOR: 'ADD_DOCTOR',
    UPDATE_DOCTOR: 'UPDATE_DOCTOR',
    TOGGLE_AVAILABILITY: 'TOGGLE_AVAILABILITY',
    SET_DOCTORS: 'SET_DOCTORS'
};

export const doctorsReducer = (state, action) => {
    switch (action.type) {
        case DOCTOR_ACTIONS.ADD_DOCTOR:
            return [...state, action.payload];

        case DOCTOR_ACTIONS.UPDATE_DOCTOR:
            return state.map(doctor =>
                doctor.id === action.payload.id ? action.payload : doctor
            );

        case DOCTOR_ACTIONS.TOGGLE_AVAILABILITY:
            return state.map(doctor =>
                doctor.id === action.payload.doctorId
                    ? { ...doctor, isAvailable: action.payload.isAvailable }
                    : doctor
            );

        case DOCTOR_ACTIONS.SET_DOCTORS:
            return action.payload;

        default:
            return state;
    }
};
