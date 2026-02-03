import React, { useContext } from 'react';
import { HospitalContext } from '../../../context/HospitalContext';
import { Card } from '../../common/UI/Card';
import { formatQueueNumber } from '../../../utils/formatters';
import './QueueDisplay.css';

export const QueueDisplay = ({ doctorId }) => {
    const { queue, patients } = useContext(HospitalContext);

    const doctorQueue = queue
        .filter(item => item.doctorId === doctorId && item.status !== 'COMPLETED' && item.status !== 'CANCELLED')
        .sort((a, b) => a.queueNumber - b.queueNumber);

    return (
        <Card title="Current Queue">
            <div className="queue-list">
                {doctorQueue.length === 0 ? (
                    <p>No patients in queue</p>
                ) : (
                    doctorQueue.map(item => {
                        const patient = patients.find(p => p.id === item.patientId);
                        return (
                            <div key={item.appointmentId} className="queue-item">
                                <span className="queue-number">{formatQueueNumber(item.queueNumber)}</span>
                                <span className="patient-name">{patient?.firstName} {patient?.lastName}</span>
                                <span className="queue-status">{item.status}</span>
                            </div>
                        );
                    })
                )}
            </div>
        </Card>
    );
};
