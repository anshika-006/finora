import React from 'react';
import { LayoutDashboard, Wallet, List, User, Settings, ShieldCheck, User2Icon, Calendar } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({ user }) => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Expenses', icon: Wallet, path: '/expenses' },
    { name: 'Categories', icon: List, path: '/categories' },
    { name: 'Income', icon: Wallet, path: '/income' },
    { name: 'Calendar', icon: Calendar, path: '/calendar' },
    { name: 'Profile', icon: User, path: '/profile' },
  ];
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-lg">
      <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
        <ShieldCheck className="w-8 h-8 text-primary-light" />
        <span className="text-2xl font-bold text-text-light dark:text-text-dark">Finora</span>
      </div>

      <div className="flex items-center gap-3 p-4 mt-4">
        <div className='rounded-full bg-gray-100 dark:bg-gray-700 p-2'>
          <User2Icon />
        </div>
        <div>
          <p className="font-semibold text-text-light dark:text-text-dark">{user?.name || 'Guest'}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Personal Account</p>
        </div>
      </div>

      <nav className="flex-grow px-4 mt-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center w-full gap-3 px-4 py-3 my-1 rounded-lg text-left transition-colors duration-200 ` +
                  (isActive
                    ? 'bg-primary-light text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700')
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center w-full gap-3 px-4 py-3 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <Settings className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

