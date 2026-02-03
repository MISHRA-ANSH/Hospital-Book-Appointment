export const PATIENT_ACTIONS = {
    ADD_PATIENT: 'ADD_PATIENT',
    UPDATE_PATIENT: 'UPDATE_PATIENT',
    DELETE_PATIENT: 'DELETE_PATIENT',
    SET_PATIENTS: 'SET_PATIENTS'
};

export const patientsReducer = (state, action) => {
    switch (action.type) {
        case PATIENT_ACTIONS.ADD_PATIENT:
            return [...state, action.payload];

        case PATIENT_ACTIONS.UPDATE_PATIENT:
            return state.map(patient =>
                patient.id === action.payload.id ? action.payload : patient
            );

        case PATIENT_ACTIONS.DELETE_PATIENT:
            return state.filter(patient => patient.id !== action.payload);

        case PATIENT_ACTIONS.SET_PATIENTS:
            return action.payload;

        default:
            return state;
    }
};
