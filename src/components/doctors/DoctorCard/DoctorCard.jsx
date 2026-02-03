import React from 'react';
import { Card } from '../../common/UI/Card';
import { Badge } from '../../common/UI/Badge';
import { formatDoctorName } from '../../../utils/formatters';
import './DoctorCard.css';

export const DoctorCard = ({ doctor, onSelect }) => {
    return (
        <Card className="doctor-card" onClick={() => onSelect && onSelect(doctor)}>
            <h3>{formatDoctorName(doctor)}</h3>
            <p className="specialization">{doctor.specialization}</p>
            <Badge variant={doctor.isAvailable ? 'success' : 'danger'}>
                {doctor.isAvailable ? 'Available' : 'Unavailable'}
            </Badge>
            <p className="working-hours">
                {doctor.workingHours?.start} - {doctor.workingHours?.end}
            </p>
        </Card>
    );
};
