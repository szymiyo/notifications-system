import React, { useState, useEffect } from 'react';
import NotificationComponent from './Notification';
import { useAppContext } from './NotificationCtx';

const Modal: React.FC = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    notifications,
    handleMarkAllAsRead,
    handleNotificationClick,
    toggleReadStatus,
  } = useAppContext();

  const [currentSection, setCurrentSection] = useState<'unread' | 'all'>('all');

  useEffect(() => {
    if (isModalOpen) {
      setCurrentSection('all');
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const unreadNotifications = notifications.filter(notification => !notification.read);

  const handleSectionChange = (section: 'unread' | 'all') => {
    setCurrentSection(section);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-50" onClick={() => setIsModalOpen(false)}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-50 w-1/4 h-3/4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Notifications</h2>
          <button className="text-red-500" onClick={() => setIsModalOpen(false)}>
            Close
          </button>
        </div>
        <div className="mb-4 grid grid-cols-12 gap-1">
          <button
            className={`col-span-4 p-4 rounded-t-lg ${currentSection === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
              }`}
            onClick={() => handleSectionChange('all')}
          >
            All Notifications
          </button>
          <button
            className={`col-span-4 p-4 rounded-t-lg ${currentSection === 'unread' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
              } rounded-l`}
            onClick={() => handleSectionChange('unread')}
          >
            Unread Notifications
          </button>
          <button className="col-start-10 col-span-3 text-blue-500 rounded-full font-semibold text-xs 2xl:text-sm" onClick={handleMarkAllAsRead}>
            Mark all as read
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {currentSection === 'unread' ? (
            <div>
              {unreadNotifications.length > 0 ? (
                unreadNotifications.map((notification, index) => (
                  <NotificationComponent
                    key={index}
                    {...notification}
                    onNotificationClick={handleNotificationClick}
                    toggleReadStatus={toggleReadStatus}
                  />
                ))
              ) : (
                <p className="text-gray-500">No unread notifications</p>
              )}
            </div>
          ) : (
            <div>
              {notifications.map((notification, index) => (
                <NotificationComponent
                  key={index}
                  {...notification}
                  onNotificationClick={handleNotificationClick}
                  toggleReadStatus={toggleReadStatus}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
