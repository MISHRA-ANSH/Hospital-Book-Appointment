import React, { useReducer, useEffect, useMemo } from 'react';
import { HospitalContext } from './HospitalContext';
import { appointmentsReducer } from './reducers/appointmentsReducer';
import { doctorsReducer } from './reducers/doctorsReducer';
import { patientsReducer } from './reducers/patientsReducer';
import { queueReducer } from './reducers/queueReducer';
import { notificationsReducer } from './reducers/notificationsReducer';
import { saveToLocalStorage, loadFromLocalStorage, initializeStorage } from '../services/persistenceService';
import { LOCAL_STORAGE_KEYS, SPECIALIZATIONS } from '../utils/constants';
import { generateId } from '../utils/helpers';

const initialDoctors = [
    { id: generateId(), firstName: 'John', lastName: 'Smith', specialization: SPECIALIZATIONS[0], isAvailable: true, workingHours: { start: '09:00', end: '17:00' } },
    { id: generateId(), firstName: 'Sarah', lastName: 'Johnson', specialization: SPECIALIZATIONS[1], isAvailable: true, workingHours: { start: '09:00', end: '17:00' } },
    { id: generateId(), firstName: 'Michael', lastName: 'Brown', specialization: SPECIALIZATIONS[2], isAvailable: true, workingHours: { start: '10:00', end: '18:00' } }
];

const initialPatients = [
    { id: generateId(), firstName: 'Alice', lastName: 'Williams', email: 'alice@example.com', phone: '555-0101' },
    { id: generateId(), firstName: 'Bob', lastName: 'Davis', email: 'bob@example.com', phone: '555-0102' }
];

export const HospitalProvider = ({ children }) => {
    initializeStorage();

    const [doctors, dispatchDoctors] = useReducer(
        doctorsReducer,
        loadFromLocalStorage(LOCAL_STORAGE_KEYS.DOCTORS, initialDoctors)
    );

    const [patients, dispatchPatients] = useReducer(
        patientsReducer,
        loadFromLocalStorage(LOCAL_STORAGE_KEYS.PATIENTS, initialPatients)
    );

    const [appointments, dispatchAppointments] = useReducer(
        appointmentsReducer,
        loadFromLocalStorage(LOCAL_STORAGE_KEYS.APPOINTMENTS, [])
    );

    const [queue, dispatchQueue] = useReducer(
        queueReducer,
        loadFromLocalStorage(LOCAL_STORAGE_KEYS.QUEUE, [])
    );

    const [notifications, dispatchNotifications] = useReducer(
        notificationsReducer,
        []
    );

    useEffect(() => {
        saveToLocalStorage(LOCAL_STORAGE_KEYS.DOCTORS, doctors);
    }, [doctors]);

    useEffect(() => {
        saveToLocalStorage(LOCAL_STORAGE_KEYS.PATIENTS, patients);
    }, [patients]);

    useEffect(() => {
        saveToLocalStorage(LOCAL_STORAGE_KEYS.APPOINTMENTS, appointments);
    }, [appointments]);

    useEffect(() => {
        saveToLocalStorage(LOCAL_STORAGE_KEYS.QUEUE, queue);
    }, [queue]);

    const value = useMemo(() => ({
        doctors,
        patients,
        appointments,
        queue,
        notifications,
        dispatchDoctors,
        dispatchPatients,
        dispatchAppointments,
        dispatchQueue,
        dispatchNotifications
    }), [doctors, patients, appointments, queue, notifications]);

    return (
        <HospitalContext.Provider value={value}>
            {children}
        </HospitalContext.Provider>
    );
};
