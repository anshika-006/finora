import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Expenses from './pages/Expenses.jsx';
import Categories from './pages/Categories.jsx';
import Profile from './pages/Profile.jsx';
import Income from './pages/Income.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Calendar from './pages/Calendar.jsx';
import Sidebar from './components/Layout/Sidebar.jsx';
import Header from './components/Layout/Header.jsx';
import { getProfile } from './api';



const headerConfig = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Overview of your expenses' },
  '/expenses': { title: 'Expenses', subtitle: 'Track and manage your expenses' },
  '/categories': { title: 'Categories', subtitle: 'Organize your spending' },
  '/income': { title: 'Income', subtitle: 'Track your income sources' },
  '/calendar': { title: 'Calendar', subtitle: 'Manage your expenses and incomes by date' },
  '/profile': { title: 'Profile', subtitle: 'Manage your account' },
};

function MainLayout({ children, user }) {
  const location = useLocation();
  const { title = '', subtitle = '' } = headerConfig[location.pathname] || {};
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-64 flex-shrink-0">
        <Sidebar user={user} onLogout={() => {}} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} subtitle={subtitle} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState({ name: 'Guest' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getProfile(token)
        .then(profile => setUser(profile))
        .catch(() => setUser({ name: 'Guest' }));
    } else {
      setUser({ name: 'Guest' });
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<MainLayout user={user}><Dashboard /></MainLayout>} />
        <Route path="/expenses" element={<MainLayout user={user}><Expenses /></MainLayout>} />
        <Route path="/categories" element={<MainLayout user={user}><Categories /></MainLayout>} />
        <Route path="/income" element={<MainLayout user={user}><Income user={user} /></MainLayout>} />
        <Route path="/calendar" element={<MainLayout user={user}><Calendar /></MainLayout>} />
        <Route path="/profile" element={<MainLayout user={user}><Profile user={user} onLogout={() => {}} /></MainLayout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

