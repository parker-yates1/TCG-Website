import React from 'react';
import { useNotification } from '../context/NotificationContext';

const Notification: React.FC = () => {
    const { notification } = useNotification();

    if (!notification) return null;

    return (
        <div className={`fixed top-20 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${notification.type === 'success' ? 'bg-green-500' :
            notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
            } text-white`}>
            {notification.message}
        </div>
    );
};

export default Notification;
