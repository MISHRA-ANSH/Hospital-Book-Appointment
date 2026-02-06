import { generateId } from '../utils/helpers';
import { APPOINTMENT_STATUS, STATUS_TRANSITIONS } from '../utils/constants';
import { saveToLocalStorage, loadFromLocalStorage } from './persistenceService';
import { markSlotAsBooked, freeSlot, isSlotBookable, getSlotById } from './timeSlotService';
import { getNextQueueNumber, addToQueue as addAppointmentToQueue } from './queueService';

const APPOINTMENTS_KEY = 'hospitalAppointments';

// Book a new appointment
export const bookAppointment = (appointmentData) => {
    const { patientId, patientName, patientEmail, doctorId, doctorName, doctorEmail, department, slotId } = appointmentData;

    // 1. Validate slot availability
    if (!isSlotBookable(slotId)) {
        throw new Error('Time slot is not available');
    }

    const slot = getSlotById(slotId);
    if (!slot) {
        throw new Error('Time slot not found');
    }

    // 2. Check for duplicate booking
    const existingAppointments = loadFromLocalStorage(APPOINTMENTS_KEY, []);
    const duplicate = existingAppointments.find(apt =>
        apt.patientId === patientId &&
        apt.doctorId === doctorId &&
        apt.date === slot.date &&
        apt.status !== APPOINTMENT_STATUS.CANCELLED
    );

    if (duplicate) {
        throw new Error('You already have an appointment with this doctor on this date');
    }

    // 3. Get queue number
    const queueNumber = getNextQueueNumber(doctorId, slot.date);

    // 4. Create appointment with PENDING status (needs doctor approval)
    const appointment = {
        id: generateId(),
        patientId,
        patientName,
        patientEmail,
        doctorId,
        doctorName,
        doctorEmail,
        department,
        date: slot.date,
        timeSlot: slot.time,
        slotId: slot.id,
        status: APPOINTMENT_STATUS.PENDING, // Changed to PENDING
        queueNumber,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        statusHistory: [{
            status: APPOINTMENT_STATUS.PENDING,
            timestamp: new Date().toISOString()
        }]
    };

    // 5. Mark slot as booked
    markSlotAsBooked(slotId, appointment.id);

    // 6. Save appointment
    const updatedAppointments = [...existingAppointments, appointment];
    saveToLocalStorage(APPOINTMENTS_KEY, updatedAppointments);

    // 7. Add to queue
    addAppointmentToQueue(appointment);

    return appointment;
};

// Get all appointments
export const getAllAppointments = () => {
    return loadFromLocalStorage(APPOINTMENTS_KEY, []);
};

// Get appointment by ID
export const getAppointmentById = (appointmentId) => {
    const appointments = getAllAppointments();
    return appointments.find(apt => apt.id === appointmentId);
};

// Update appointment status
export const updateAppointmentStatus = (appointmentId, newStatus) => {
    const appointments = getAllAppointments();
    const appointment = appointments.find(apt => apt.id === appointmentId);

    if (!appointment) {
        throw new Error('Appointment not found');
    }

    // Validate transition
    const validTransitions = STATUS_TRANSITIONS[appointment.status] || [];
    if (!validTransitions.includes(newStatus)) {
        throw new Error(`Cannot transition from ${appointment.status} to ${newStatus}`);
    }

    // Update status
    appointment.status = newStatus;
    appointment.updatedAt = new Date().toISOString();
    appointment.statusHistory.push({
        status: newStatus,
        timestamp: new Date().toISOString()
    });

    // Save updated appointments
    const updatedAppointments = appointments.map(apt =>
        apt.id === appointmentId ? appointment : apt
    );
    saveToLocalStorage(APPOINTMENTS_KEY, updatedAppointments);

    return appointment;
};

// Cancel appointment
export const cancelAppointment = (appointmentId, reason = '') => {
    const appointments = getAllAppointments();
    const appointment = appointments.find(apt => apt.id === appointmentId);

    if (!appointment) {
        throw new Error('Appointment not found');
    }

    // Validate can cancel
    if ([APPOINTMENT_STATUS.IN_CONSULTATION, APPOINTMENT_STATUS.COMPLETED].includes(appointment.status)) {
        throw new Error('Cannot cancel appointment in this status');
    }

    // Check if last-minute cancellation (within 1 hour)
    const appointmentTime = new Date(`${appointment.date}T${appointment.timeSlot}`);
    const now = new Date();
    const hoursDiff = (appointmentTime - now) / (1000 * 60 * 60);

    if (hoursDiff < 1 && hoursDiff > 0) {
        console.warn('Last-minute cancellation detected');
    }

    // Update status
    appointment.status = APPOINTMENT_STATUS.CANCELLED;
    appointment.cancellationReason = reason;
    appointment.updatedAt = new Date().toISOString();
    appointment.statusHistory.push({
        status: APPOINTMENT_STATUS.CANCELLED,
        timestamp: new Date().toISOString(),
        reason
    });

    // Free slot
    freeSlot(appointment.slotId);

    // Save updated appointments
    const updatedAppointments = appointments.map(apt =>
        apt.id === appointmentId ? appointment : apt
    );
    saveToLocalStorage(APPOINTMENTS_KEY, updatedAppointments);

    return appointment;
};

// Get appointments by patient
export const getAppointmentsByPatient = (patientId) => {
    const appointments = getAllAppointments();
    return appointments.filter(apt => apt.patientId === patientId);
};

// Get appointments by doctor
export const getAppointmentsByDoctor = (doctorId) => {
    const appointments = getAllAppointments();
    return appointments.filter(apt => apt.doctorId === doctorId);
};

// Get appointments by date
export const getAppointmentsByDate = (date) => {
    const appointments = getAllAppointments();
    return appointments.filter(apt => apt.date === date);
};

// Get appointments by doctor and date
export const getAppointmentsByDoctorAndDate = (doctorId, date) => {
    const appointments = getAllAppointments();
    return appointments.filter(apt =>
        apt.doctorId === doctorId && apt.date === date
    );
};

// Get patient history with filters
export const getPatientHistory = (patientId, filters = {}) => {
    let appointments = getAppointmentsByPatient(patientId);

    // Apply date filter
    if (filters.dateRange) {
        const now = new Date();
        let startDate;

        switch (filters.dateRange) {
            case 'today':
                startDate = new Date(now.setHours(0, 0, 0, 0));
                break;
            case 'week':
                startDate = new Date(now.setDate(now.getDate() - 7));
                break;
            case 'month':
                startDate = new Date(now.setMonth(now.getMonth() - 1));
                break;
            case 'custom':
                startDate = new Date(filters.startDate);
                break;
            default:
                startDate = null;
        }

        if (startDate) {
            appointments = appointments.filter(apt => new Date(apt.date) >= startDate);
        }
    }

    // Apply status filter
    if (filters.status && filters.status !== 'all') {
        appointments = appointments.filter(apt => apt.status === filters.status.toUpperCase());
    }

    // Sort by date (newest first)
    appointments.sort((a, b) => new Date(b.date) - new Date(a.date));

    return appointments;
};

// Approve appointment (Doctor action)
export const approveAppointment = (appointmentId) => {
    const appointments = getAllAppointments();
    const appointment = appointments.find(apt => apt.id === appointmentId);

    if (!appointment) {
        throw new Error('Appointment not found');
    }

    if (appointment.status !== APPOINTMENT_STATUS.PENDING) {
        throw new Error('Only pending appointments can be approved');
    }

    // Update status to BOOKED
    appointment.status = APPOINTMENT_STATUS.BOOKED;
    appointment.updatedAt = new Date().toISOString();
    appointment.statusHistory.push({
        status: APPOINTMENT_STATUS.BOOKED,
        timestamp: new Date().toISOString()
    });

    // Save updated appointments
    const updatedAppointments = appointments.map(apt =>
        apt.id === appointmentId ? appointment : apt
    );
    saveToLocalStorage(APPOINTMENTS_KEY, updatedAppointments);

    return appointment;
};

// Reject appointment (Doctor action)
export const rejectAppointment = (appointmentId, reason = '') => {
    const appointments = getAllAppointments();
    const appointment = appointments.find(apt => apt.id === appointmentId);

    if (!appointment) {
        throw new Error('Appointment not found');
    }

    if (appointment.status !== APPOINTMENT_STATUS.PENDING) {
        throw new Error('Only pending appointments can be rejected');
    }

    // Update status to REJECTED
    appointment.status = APPOINTMENT_STATUS.REJECTED;
    appointment.rejectionReason = reason;
    appointment.updatedAt = new Date().toISOString();
    appointment.statusHistory.push({
        status: APPOINTMENT_STATUS.REJECTED,
        timestamp: new Date().toISOString(),
        reason
    });

    // Free slot
    freeSlot(appointment.slotId);

    // Save updated appointments
    const updatedAppointments = appointments.map(apt =>
        apt.id === appointmentId ? appointment : apt
    );
    saveToLocalStorage(APPOINTMENTS_KEY, updatedAppointments);

    return appointment;
};

// Get pending appointments for doctor
export const getPendingAppointmentsByDoctor = (doctorId) => {
    const appointments = getAllAppointments();
    return appointments.filter(apt =>
        apt.doctorId === doctorId &&
        apt.status === APPOINTMENT_STATUS.PENDING
    ).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
};


// Complete appointment with prescription
export const completeAppointment = (appointmentId, prescriptionData) => {
    const appointments = getAllAppointments();
    const appointment = appointments.find(apt => apt.id === appointmentId);

    if (!appointment) {
        throw new Error('Appointment not found');
    }

    if (appointment.status !== APPOINTMENT_STATUS.IN_CONSULTATION && appointment.status !== APPOINTMENT_STATUS.BOOKED) {
        throw new Error('Only appointments in consultation or booked can be completed');
    }

    // Update status to COMPLETED
    appointment.status = APPOINTMENT_STATUS.COMPLETED;
    appointment.completedAt = new Date().toISOString();
    appointment.updatedAt = new Date().toISOString();
    appointment.statusHistory.push({
        status: APPOINTMENT_STATUS.COMPLETED,
        timestamp: new Date().toISOString()
    });

    // Add prescription data if provided
    if (prescriptionData) {
        appointment.prescription = prescriptionData;
    }

    // Save updated appointments
    const updatedAppointments = appointments.map(apt =>
        apt.id === appointmentId ? appointment : apt
    );
    saveToLocalStorage(APPOINTMENTS_KEY, updatedAppointments);

    return appointment;
};
