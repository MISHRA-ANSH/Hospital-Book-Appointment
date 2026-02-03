import React from 'react';
import { Badge } from '../../common/UI/Badge';
import { APPOINTMENT_STATUS } from '../../../utils/constants';

const statusVariants = {
    [APPOINTMENT_STATUS.BOOKED]: 'info',
    [APPOINTMENT_STATUS.CHECKED_IN]: 'warning',
    [APPOINTMENT_STATUS.IN_CONSULTATION]: 'primary',
    [APPOINTMENT_STATUS.COMPLETED]: 'success',
    [APPOINTMENT_STATUS.CANCELLED]: 'danger'
};

export const AppointmentStatusBadge = ({ status }) => {
    return <Badge variant={statusVariants[status] || 'default'}>{status}</Badge>;
};
