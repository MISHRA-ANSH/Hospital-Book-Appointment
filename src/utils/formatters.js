export const formatPatientName = (patient) => {
    return `${patient.firstName} ${patient.lastName}`;
};

export const formatDoctorName = (doctor) => {
    return `Dr. ${doctor.firstName} ${doctor.lastName}`;
};

export const formatAppointmentTime = (time) => {
    return time;
};

export const formatQueueNumber = (number) => {
    return `#${String(number).padStart(3, '0')}`;
};
