import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMembership } from '../hooks/useMembership';
import { API_URL } from '../config';


const Dashboard = () => {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const { membership, loading: memLoading } = useMembership();

  useEffect(() => {
    if (token) {
      axios.get(`${API_URL}/api/attendance/my-history`, { headers: { Authorization: `Bearer ${token}` }})

        .then(res => setHistory(res.data))
        .catch(console.error);
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  const getDaysInMonth = () => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };

  const isDayMarked = (day) => {
    if (!day) return false;
    const today = new Date();
    const checkDateStr = new Date(today.getFullYear(), today.getMonth(), day).toLocaleDateString();
    return history.some(item => new Date(item.checkInTime).toLocaleDateString() === checkDateStr);
  };

  const monthDays = getDaysInMonth();
  const currentMonthName = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();

  if (!user) return <p>Loading...</p>;

  return (
    <Layout title="Dashboard">
      <div className="p-4 flex flex-col items-center">
        {/* Profile Card */}
        <div className="w-full max-w-md bg-white dark:bg-background-dark/80 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-primary/20 text-primary flex items-center justify-center rounded-full text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
              <p className="text-sm text-gray-500">ID: {user.memberId}</p>
            </div>
          </div>
          
          <button onClick={() => { logout(); navigate('/login'); }} className="text-red-500 font-semibold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>

          {/* Membership Notification */}
          {!memLoading && membership && membership.status === 'active' ? (
            <div className="bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 p-4 rounded mb-6 flex gap-3">
               <span className="material-symbols-outlined text-green-600">verified</span>
               <div>
                  <p className="font-bold text-green-800 dark:text-green-200">Membership Active</p>
                  <p className="text-sm text-green-700 dark:text-green-300">Your {membership.planType || 'gym'} membership is active until {new Date(membership.endDate).toLocaleDateString()}. Keep it up!</p>
               </div>
            </div>
          ) : !memLoading && (
             <div className="bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-4 rounded mb-6 flex gap-3">
               <span className="material-symbols-outlined text-yellow-600">warning</span>
               <div className="flex-1">
                  <p className="font-bold text-yellow-800 dark:text-yellow-200">No Active Membership</p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">You need a membership to book classes and talk to trainers.</p>
                  <button onClick={() => navigate('/#pricing')} className="text-sm font-bold bg-yellow-500 text-white px-3 py-1 rounded">View Plans</button>
               </div>
            </div>
          )}

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Attendance Calendar</h3>
              <span className="text-sm font-medium text-gray-500">{currentMonthName} {currentYear}</span>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                <div key={day} className="text-[10px] font-bold text-gray-400 uppercase">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {monthDays.map((day, idx) => {
                const marked = isDayMarked(day);
                const isToday = day === new Date().getDate();
                return (
                  <div 
                    key={idx} 
                    className={`h-8 w-8 flex items-center justify-center rounded-lg text-xs font-medium transition-all
                      ${!day ? 'bg-transparent' : marked ? 'bg-primary text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}
                      ${isToday && !marked ? 'border-2 border-primary text-primary' : ''}
                    `}
                  >
                    {day}
                    {marked && (
                      <span className="absolute mt-5 text-[8px] font-bold text-primary dark:text-primary-light">•</span>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 flex items-center gap-4 text-[10px] text-gray-500">
               <div className="flex items-center gap-1">
                 <div className="w-2 h-2 bg-primary rounded-full"></div>
                 <span>Present</span>
               </div>
               <div className="flex items-center gap-1">
                 <div className="w-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                 <span>Absent / Not Tracked</span>
               </div>
            </div>
          </div>

          <div className="mt-8">
             <button onClick={() => navigate('/chat')} className="w-full bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 text-white font-bold py-3 rounded-xl transition-all shadow-md flex justify-center items-center gap-2">
              <span className="material-symbols-outlined">smart_toy</span>
              Ask FitTrack AI Assistant
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
