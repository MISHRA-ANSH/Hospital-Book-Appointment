import React, { useState, useContext } from 'react';
import { HospitalContext } from '../../context/HospitalContext';
import { QueueDisplay } from '../../components/queue/QueueDisplay';
import { Select } from '../../components/common/UI/Select';
import './ManageQueuePage.css';

export const ManageQueuePage = () => {
    const { doctors } = useContext(HospitalContext);
    const [selectedDoctor, setSelectedDoctor] = useState('');

    const doctorOptions = doctors.map(d => ({
        value: d.id,
        label: `Dr. ${d.firstName} ${d.lastName}`
    }));

    return (
        <div className="manage-queue-page">
            <h1>Manage Queue</h1>

            <Select
                label="Select Doctor"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                options={doctorOptions}
                placeholder="Choose a doctor"
            />

            {selectedDoctor && <QueueDisplay doctorId={selectedDoctor} />}
        </div>
    );
};
