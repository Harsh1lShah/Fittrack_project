import React, { useContext, useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';


const CheckIn = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [isAlreadyMarked, setIsAlreadyMarked] = useState(false);

  useEffect(() => {
    if (token) {
      axios.get(`${API_URL}/api/attendance/my-history`, { headers: { Authorization: `Bearer ${token}` }})

        .then(res => {
          const today = new Date().toLocaleDateString();
          const alreadyMarked = res.data.some(item => new Date(item.checkInTime).toLocaleDateString() === today);
          if (alreadyMarked) {
            setIsAlreadyMarked(true);
            setStatus('Your attendance is already registered for today.');
          }
        })
        .catch(console.error);
    }
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, [token]);

  const handleConfirm = async () => {
    try {
      setStatus('Marking attendance...');
      await axios.post(`${API_URL}/api/attendance/checkin`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStatus('Success! Attendance marked.');

      setIsAlreadyMarked(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      if (error.response?.status === 400) {
        setStatus(error.response.data.message || 'Attendance already registered for today.');
        setIsAlreadyMarked(true);
      } else {
        setStatus('Failed to mark. Please try again.');
      }
    }
  };

  if (!user) {
    return (
      <Layout title="Check-In">
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
          <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">account_circle</span>
          <h2 className="text-xl font-bold mb-2">Please Login First</h2>
          <p className="text-gray-500 mb-6">You need to be logged in to mark your attendance.</p>
          <button onClick={() => navigate('/login')} className="bg-primary text-white px-6 py-2 rounded-lg font-bold">
            Login
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Mark Attendance">
      <div className="p-4 flex flex-col items-center">
        <div className="w-full max-w-md bg-white dark:bg-background-dark/80 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mt-10">
          <div className="text-center mb-6">
            <span className="material-symbols-outlined text-primary text-5xl mb-2">how_to_reg</span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Confirm Check-In</h2>
            <p className="text-sm text-gray-500">Review your details and tap confirm below to mark your attendance for today.</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-700">
              <span className="text-gray-500">Name</span>
              <span className="font-bold text-gray-900 dark:text-gray-100">{user.name}</span>
            </div>
            <div className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-700">
              <span className="text-gray-500">Gym</span>
              <span className="font-bold text-gray-900 dark:text-gray-100">FitLife Center 1</span>
            </div>
            <div className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-700">
              <span className="text-gray-500">Member ID</span>
              <span className="font-bold text-gray-900 dark:text-gray-100">{user.memberId}</span>
            </div>
            <div className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-700">
              <span className="text-gray-500">Time</span>
              <span className="font-bold text-primary">{currentTime}</span>
            </div>
          </div>

          <button 
            onClick={handleConfirm}
            disabled={isAlreadyMarked}
            className={`w-full font-bold py-3 rounded-xl transition-all shadow-md flex justify-center items-center gap-2 ${isAlreadyMarked ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 text-white'}`}
          >
            <span className="material-symbols-outlined">check_circle</span>
            {isAlreadyMarked ? 'Attendance Already Marked' : 'Confirm Attendance'}
          </button>
          
          {status && (
            <p className={`text-center mt-4 text-sm font-medium ${isAlreadyMarked ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-500'}`}>
              {status}
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CheckIn;
