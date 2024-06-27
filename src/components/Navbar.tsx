import React from 'react';
import Bell from '../assets/bell-svgrepo-com.svg?react';
import Modal from './NotificationModal';
import UnreadNotifications from './UnreadNotifications';
import { Route, Routes } from 'react-router-dom';
import NotificationDetail from './NotificationsDetails';
import { useAppContext } from './NotificationCtx';

const Navbar: React.FC = () => {
  const { notificationCount, setIsModalOpen } = useAppContext();

  const handleBellClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <nav className="flex justify-between items-center px-6 py-3 bg-gray-800 text-white">
        <div className="text-2xl font-bold">Notification App</div>
        <div className="relative cursor-pointer" onClick={handleBellClick}>
          <Bell className="text-2xl" />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {notificationCount}
            </span>
          )}
        </div>
      </nav>
      <Modal />
      <UnreadNotifications />
      <Routes>
        <Route path="/notification/:message" element={<NotificationDetail />} />
      </Routes>
    </>
  );
};

export default Navbar;
