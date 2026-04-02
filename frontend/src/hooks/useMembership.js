import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { API_URL } from '../config';

export const useMembership = () => {
  const { token, user } = useContext(AuthContext);
  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token && user) {
      axios.get(`${API_URL}/api/membership/my-plan`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      .then(res => {
        setMembership(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch membership', err);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [token, user]);

  return { membership, loading };
};
