import React from 'react';
import { useParams } from 'react-router-dom';

const NotificationDetail: React.FC = () => {
    const { message } = useParams<{ message: string }>();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">The content of your message is: {message}</h1>
        </div>
    );
};

export default NotificationDetail;