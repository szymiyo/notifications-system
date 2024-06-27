import React from 'react';
import { Link } from 'react-router-dom';

export interface Notification {
    message: string;
    read: boolean;
    type: 'Request' | 'Status change to on hold' | 'New feature';
}

interface NotificationProps extends Notification {
    onClick?: () => void;
    onNotificationClick?: (message: string) => void;
    toggleReadStatus?: (message: string) => void;
}

const NotificationComponent: React.FC<NotificationProps> = ({ message, read, type, onClick, onNotificationClick, toggleReadStatus }) => {
    const handleClick = () => {
        if (onNotificationClick) {
            onNotificationClick(message);
        }
        if (onClick) {
            onClick();
        }
    };

    const handleToggleReadStatus = (event: React.MouseEvent) => {
        event.preventDefault();
        if (toggleReadStatus) {
            toggleReadStatus(message);
        }
    };

    const getNotificationLink = () => {
        return `/notification/${encodeURIComponent(message)}`;
    };

    return (
        <div className="flex items-center justify-between p-4 mb-2 rounded-lg shadow cursor-pointer bg-white relative">
            <Link to={getNotificationLink()} onClick={handleClick} className="flex-1">
                <div className={`font-bold ${read ? 'text-gray-500' : 'text-gray-800'}`}>
                    {type === 'Request' && '📩'}
                    {type === 'Status change to on hold' && '⏸️'}
                    {type === 'New feature' && '➕'}
                    <span className="ml-2">{type}</span>
                </div>
                <div className={`${read ? 'text-gray-500' : 'text-gray-800'}`}>{message}</div>
            </Link>
            <div onClick={handleToggleReadStatus} className="ml-4">
                <div className={`absolute top-3 right-3 h-5 w-5 rounded-full ${read ? 'bg-gray-500' : 'bg-blue-500'}`}></div>
            </div>
        </div>
    );
};

export default NotificationComponent;