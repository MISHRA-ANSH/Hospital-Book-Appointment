import { generateId } from '../utils/helpers';
import { saveToLocalStorage, loadFromLocalStorage } from './persistenceService';

const PRESCRIPTIONS_KEY = 'hospitalPrescriptions';

// Create a new prescription
export const createPrescription = (prescriptionData) => {
    const {
        appointmentId,
        patientId,
        patientName,
        doctorId,
        doctorName,
        medicines,
        diagnosis,
        notes
    } = prescriptionData;

    const prescription = {
        id: generateId(),
        appointmentId,
        patientId,
        patientName,
        doctorId,
        doctorName,
        medicines, // Array of { name, dosage, duration, instructions }
        diagnosis,
        notes,
        createdAt: new Date().toISOString()
    };

    const prescriptions = loadFromLocalStorage(PRESCRIPTIONS_KEY, []);
    prescriptions.push(prescription);
    saveToLocalStorage(PRESCRIPTIONS_KEY, prescriptions);

    return prescription;
};

// Get prescriptions by patient
export const getPrescriptionsByPatient = (patientId) => {
    const prescriptions = loadFromLocalStorage(PRESCRIPTIONS_KEY, []);
    return prescriptions.filter(p => p.patientId === patientId);
};

// Get prescriptions by doctor
export const getPrescriptionsByDoctor = (doctorId) => {
    const prescriptions = loadFromLocalStorage(PRESCRIPTIONS_KEY, []);
    return prescriptions.filter(p => p.doctorId === doctorId);
};

// Get prescription by appointment
export const getPrescriptionByAppointment = (appointmentId) => {
    const prescriptions = loadFromLocalStorage(PRESCRIPTIONS_KEY, []);
    return prescriptions.find(p => p.appointmentId === appointmentId);
};

// Get all prescriptions
export const getAllPrescriptions = () => {
    return loadFromLocalStorage(PRESCRIPTIONS_KEY, []);
};
