import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
// We will create the Dashboard page next
// import Dashboard from '../../pages/Dashboard'; 

const MainLayout = ({ user, onLogout }) => {
  // This state will eventually control which page is shown.
  // For now, we'll hardcode it to show the Dashboard.
  const currentPage = 'Dashboard';

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar user={user} onLogout={onLogout} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 p-8 overflow-y-auto">
          <Header title="Dashboard" subtitle="Overview of your expenses" />
          {/* Placeholder for page content */}
          <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">Welcome to your Dashboard!</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Dashboard content will go here.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
