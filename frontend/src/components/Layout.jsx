import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Layout = ({ children, title = "FitTrack" }) => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200 min-h-screen">
      <div className="relative flex min-h-screen w-full flex-col justify-between">
        
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="FitTrack Logo" className="h-10 w-auto object-contain" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h1>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
               <div className="flex items-center gap-3">
                 <span className="text-sm font-medium dark:text-gray-300 hidden @[480px]:inline">{user.name}</span>
                 <button onClick={logout} className="rounded-lg bg-red-500/10 px-3 py-1.5 text-sm font-bold text-red-500 hover:bg-red-500/20">Logout</button>
               </div>
            ) : (
               <div className="flex items-center gap-3">
                 <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-primary dark:text-gray-300">Login</Link>
                 <Link to="/register" className="rounded-lg bg-primary px-3 py-1.5 text-sm font-bold text-white transition-transform hover:scale-105">Register</Link>
               </div>
            )}
            <button className="flex items-center justify-center rounded-full h-10 w-10 text-gray-600 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Bottom Nav */}
        <footer className="sticky bottom-0 z-50">
          <div className="border-t border-gray-200/10 dark:border-gray-700/50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm px-4 pt-2 pb-safe-bottom pb-4">
            <nav className="flex items-center justify-around">
              <Link to="/" className={`flex flex-col items-center gap-1 py-2 ${location.pathname === '/' ? 'text-primary' : 'text-gray-500 hover:text-primary'}`}>
                <span className="material-symbols-outlined">home</span>
                <p className="text-xs font-medium">Home</p>
              </Link>
              <Link to="/schedule" className={`flex flex-col items-center gap-1 py-2 ${location.pathname === '/schedule' ? 'text-primary' : 'text-gray-500 hover:text-primary'}`}>
                <span className="material-symbols-outlined">calendar_month</span>
                <p className="text-xs font-medium">Classes</p>
              </Link>
              <Link to="/trainers" className={`flex flex-col items-center gap-1 py-2 ${location.pathname === '/trainers' ? 'text-primary' : 'text-gray-500 hover:text-primary'}`}>
                <span className="material-symbols-outlined">group</span>
                <p className="text-xs font-medium">Trainers</p>
              </Link>
              <Link to="/dashboard" className={`flex flex-col items-center gap-1 py-2 ${location.pathname === '/dashboard' ? 'text-primary' : 'text-gray-500 hover:text-primary'}`}>
                <span className="material-symbols-outlined">person</span>
                <p className="text-xs font-medium">Profile</p>
              </Link>
              <Link to="/checkin" className={`flex flex-col items-center gap-1 py-2 ${location.pathname === '/checkin' ? 'text-primary' : 'text-gray-500 hover:text-primary'}`}>
                <span className="material-symbols-outlined">how_to_reg</span>
                <p className="text-xs font-medium">Check-In</p>
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
