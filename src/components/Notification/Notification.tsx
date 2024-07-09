import React from 'react';
import { Alert } from 'react-bootstrap';

interface NotificationProps {
    message: string;
    type: 'success' | 'danger';
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
    return (
        <Alert variant={type} onClose={onClose} dismissible>
            {message}
        </Alert>
    );
};

export default Notification;
