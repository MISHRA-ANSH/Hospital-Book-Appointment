export const APPOINTMENT_STATUS = {
    BOOKED: 'BOOKED',
    CHECKED_IN: 'CHECKED_IN',
    IN_CONSULTATION: 'IN_CONSULTATION',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED'
};

export const STATUS_TRANSITIONS = {
    BOOKED: ['CHECKED_IN', 'CANCELLED'],
    CHECKED_IN: ['IN_CONSULTATION', 'CANCELLED'],
    IN_CONSULTATION: ['COMPLETED'],
    COMPLETED: [],
    CANCELLED: []
};

export const SPECIALIZATIONS = [
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'General Medicine'
];

export const SLOT_DURATION = 30; // minutes
export const WORKING_HOURS = { start: '09:00', end: '17:00' };

export const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
};

export const LOCAL_STORAGE_KEYS = {
    DOCTORS: 'hospital_doctors',
    PATIENTS: 'hospital_patients',
    APPOINTMENTS: 'hospital_appointments',
    QUEUE: 'hospital_queue'
};
