import { useContext } from 'react';
import { HospitalContext } from '../context/HospitalContext';
import { NOTIFICATION_ACTIONS } from '../context/reducers/notificationsReducer';
import { createNotification } from '../services/notificationService';

export const useNotifications = () => {
    const context = useContext(HospitalContext);

    if (!context) {
        throw new Error('useNotifications must be used within HospitalProvider');
    }

    const { notifications, dispatchNotifications } = context;

    const addNotification = (type, message, details = {}) => {
        const notification = createNotification(type, message, details);
        dispatchNotifications({ type: NOTIFICATION_ACTIONS.ADD_NOTIFICATION, payload: notification });
    };

    const markAsRead = (notificationId) => {
        dispatchNotifications({ type: NOTIFICATION_ACTIONS.MARK_AS_READ, payload: notificationId });
    };

    const removeNotification = (notificationId) => {
        dispatchNotifications({ type: NOTIFICATION_ACTIONS.REMOVE_NOTIFICATION, payload: notificationId });
    };

    const clearAll = () => {
        dispatchNotifications({ type: NOTIFICATION_ACTIONS.CLEAR_ALL });
    };

    return {
        notifications,
        addNotification,
        markAsRead,
        removeNotification,
        clearAll
    };
};
