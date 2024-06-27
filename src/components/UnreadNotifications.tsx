import React from 'react';
import NotificationComponent from './Notification';
import { useAppContext } from './NotificationCtx';

const UnreadNotifications: React.FC = () => {
  const { notifications, handleNotificationClick, toggleReadStatus } = useAppContext();

  const unreadNotifications = notifications.filter(notification => !notification.read);

  return (
    <>
      {unreadNotifications.length > 0 && (
        <div className="fixed top-20 right-4 w-64 bg-white shadow-lg rounded-lg p-4 space-y-2 z-50">
          {unreadNotifications.map((notification, index) => (
            <NotificationComponent
              key={index}
              {...notification}
              onNotificationClick={handleNotificationClick}
              toggleReadStatus={toggleReadStatus}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default UnreadNotifications;