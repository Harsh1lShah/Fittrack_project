import React, { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import { useMembership } from '../hooks/useMembership';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Classes = () => {
  const { token, user } = useContext(AuthContext);
  const { membership, loading: memLoading } = useMembership();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchClasses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/classes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClasses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchClasses();
  }, [token]);

  const handleBook = async (classId) => {
    try {
      await axios.post(`http://localhost:5000/api/classes/${classId}/book`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchClasses();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to book class');
    }
  };

  const handleUnbook = async (classId) => {
    try {
      await axios.post(`http://localhost:5000/api/classes/${classId}/unbook`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchClasses();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to unbook class');
    }
  };

  if (!user) {
    return (
        <Layout title="Classes">
            <div className="p-8 text-center flex flex-col items-center justify-center">
                <p className="mb-4">You need to log in to view classes.</p>
                <button onClick={() => navigate('/login')} className="bg-primary text-white font-bold py-2 px-6 rounded">Login</button>
            </div>
        </Layout>
    );
  }

  const hasMembership = !memLoading && membership && membership.status === 'active';

  return (
    <Layout title="Gym Classes">
      <div className="p-4 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Class Schedule</h2>
          
          {!hasMembership && !memLoading && (
            <div className="bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-4 rounded mb-6">
               <p className="font-bold text-yellow-800 dark:text-yellow-200">Subscription Required</p>
               <p className="text-sm text-yellow-700 dark:text-yellow-300">You need an active membership plan to book classes.</p>
               <button onClick={() => navigate('/#pricing')} className="mt-2 text-sm font-bold bg-yellow-500 text-white px-4 py-2 rounded-lg">View Plans</button>
            </div>
          )}

          {loading ? (
            <p>Loading classes...</p>
          ) : classes.length === 0 ? (
            <p className="text-gray-500">No classes at the moment.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {classes.map(c => {
                const isBooked = c.attendees.includes(user._id);
                const isFull = c.attendees.length >= c.capacity;
                return (
                  <div key={c._id} className="bg-white dark:bg-background-dark/80 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">{c.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">schedule</span> {c.time}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-sm">person</span> {c.trainerName}
                      </p>
                      <p className="text-xs mt-2 text-blue-500 font-semibold">{c.attendees.length} / {c.capacity} Booked</p>
                    </div>
                    <div>
                      {isBooked ? (
                        <button onClick={() => handleUnbook(c._id)} className="bg-red-500/10 text-red-500 font-bold px-4 py-2 rounded-lg hover:bg-red-500/20">
                          Cancel
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleBook(c._id)} 
                          disabled={!hasMembership || isFull}
                          className={`font-bold px-4 py-2 rounded-lg transition-colors ${!hasMembership || isFull ? 'bg-gray-200 text-gray-400 dark:bg-gray-800 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90 shadow'}`}
                        >
                          {isFull ? 'Full' : 'Book'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Classes;
