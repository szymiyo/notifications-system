import React, { createContext, useContext, useState, useEffect } from 'react';
import { Notification } from './Notification';

interface ContextType {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  notificationCount: number;
  setNotificationCount: React.Dispatch<React.SetStateAction<number>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleMarkAllAsRead: () => void;
  handleNotificationClick: (message: string) => void;
  toggleReadStatus: (message: string) => void;
}

const initialNotifications: Notification[] = [
  { message: 'New request received', read: false, type: 'Request' },
  { message: 'Status changed to on hold', read: false, type: 'Status change to on hold' },
  { message: 'New feature added', read: true, type: 'New feature' },
  { message: 'Another request received', read: false, type: 'Request' },
  { message: 'Status changed to on hold again', read: true, type: 'Status change to on hold' },
  { message: 'Status changed to on hold again again', read: true, type: 'Status change to on hold' },
];

const initialNotificationCount = initialNotifications.filter(notification => !notification.read).length;

export const AppContext = createContext<ContextType>({
  notifications: initialNotifications,
  setNotifications: () => { },
  notificationCount: initialNotificationCount,
  setNotificationCount: () => { },
  isModalOpen: false,
  setIsModalOpen: () => { },
  handleMarkAllAsRead: () => { },
  handleNotificationClick: () => { },
  toggleReadStatus: () => { },
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const storedNotifications = localStorage.getItem('notifications');
    return storedNotifications ? JSON.parse(storedNotifications) : initialNotifications;
  });

  const [notificationCount, setNotificationCount] = useState<number>(() => {
    const storedNotifications = localStorage.getItem('notifications');
    const parsedNotifications: Notification[] = storedNotifications ? JSON.parse(storedNotifications) : initialNotifications;
    return parsedNotifications.filter(notification => !notification.read).length;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
    setNotificationCount(0);
  };

  const handleNotificationClick = (message: string) => {
    const updatedNotifications = notifications.map(notification =>
      notification.message === message ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    setNotificationCount(updatedNotifications.filter(notification => !notification.read).length);
    setIsModalOpen(false);
  };

  const toggleReadStatus = (message: string) => {
    const updatedNotifications = notifications.map(notification =>
      notification.message === message ? { ...notification, read: !notification.read } : notification
    );
    setNotifications(updatedNotifications);
    setNotificationCount(updatedNotifications.filter(notification => !notification.read).length);
  };

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  return (
    <AppContext.Provider
      value={{
        notifications,
        setNotifications,
        notificationCount,
        setNotificationCount,
        isModalOpen,
        setIsModalOpen,
        handleMarkAllAsRead,
        handleNotificationClick,
        toggleReadStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
