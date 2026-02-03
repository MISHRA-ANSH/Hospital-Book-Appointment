import React, { useState, useContext } from 'react';
import { HospitalContext } from '../../../context/HospitalContext';
import { useAppointments } from '../../../hooks/useAppointments';
import { useTimeSlots } from '../../../hooks/useTimeSlots';
import { useQueue } from '../../../hooks/useQueue';
import { DoctorCard } from '../../doctors/DoctorCard';
import { TimeSlotPicker } from '../TimeSlotPicker';
import { Button } from '../../common/UI/Button';
import { Input } from '../../common/UI/Input';
import { Card } from '../../common/UI/Card';
import { formatDate } from '../../../utils/dateUtils';
import { addMinutes } from '../../../utils/dateUtils';
import { SLOT_DURATION } from '../../../utils/constants';
import './BookingWizard.css';

export const BookingWizard = ({ patientId, onComplete }) => {
    const { doctors } = useContext(HospitalContext);
    const { book } = useAppointments();
    const { getSlots } = useTimeSlots();
    const { addToQueue } = useQueue();

    const [step, setStep] = useState(1);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [slots, setSlots] = useState([]);

    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor);
        setStep(2);
    };

    const handleDateSelect = () => {
        const availableSlots = getSlots(selectedDoctor.id, selectedDate);
        setSlots(availableSlots);
        setStep(3);
    };

    const handleSlotSelect = (slot) => {
        setSelectedSlot(slot);
    };

    const handleConfirm = () => {
        try {
            const timeEnd = addMinutes(selectedSlot.start, SLOT_DURATION);
            const appointment = book(patientId, selectedDoctor.id, selectedDate, selectedSlot.start, timeEnd);
            addToQueue(appointment);
            onComplete && onComplete(appointment);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="booking-wizard">
            {step === 1 && (
                <Card title="Step 1: Select Doctor">
                    <div className="doctor-grid">
                        {doctors.filter(d => d.isAvailable).map(doctor => (
                            <DoctorCard key={doctor.id} doctor={doctor} onSelect={handleDoctorSelect} />
                        ))}
                    </div>
                </Card>
            )}

            {step === 2 && (
                <Card title="Step 2: Select Date">
                    <Input
                        type="date"
                        label="Appointment Date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    <Button onClick={handleDateSelect}>Next</Button>
                </Card>
            )}

            {step === 3 && (
                <Card title="Step 3: Select Time">
                    <TimeSlotPicker
                        slots={slots}
                        selectedSlot={selectedSlot?.start}
                        onSelectSlot={handleSlotSelect}
                    />
                    {selectedSlot && (
                        <Button onClick={handleConfirm}>Confirm Booking</Button>
                    )}
                </Card>
            )}
        </div>
    );
};
