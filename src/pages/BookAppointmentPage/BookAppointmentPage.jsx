import React, { useState, useContext } from 'react';
import { HospitalContext } from '../../context/HospitalContext';
import { BookingWizard } from '../../components/appointments/BookingWizard';
import { Select } from '../../components/common/UI/Select';
import './BookAppointmentPage.css';

export const BookAppointmentPage = () => {
    const { patients } = useContext(HospitalContext);
    const [selectedPatient, setSelectedPatient] = useState('');

    const patientOptions = patients.map(p => ({
        value: p.id,
        label: `${p.firstName} ${p.lastName}`
    }));

    return (
        <div className="book-appointment-page">
            <h1>Book Appointment</h1>

            <Select
                label="Select Patient"
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                options={patientOptions}
                placeholder="Choose a patient"
            />

            {selectedPatient && (
                <BookingWizard
                    patientId={selectedPatient}
                    onComplete={() => alert('Appointment booked successfully!')}
                />
            )}
        </div>
    );
};
