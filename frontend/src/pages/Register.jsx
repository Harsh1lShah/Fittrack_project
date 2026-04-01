import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Layout from '../components/Layout';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Layout title="Register">
      <div className="flex flex-col items-center justify-center p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-sm mt-12 space-y-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold dark:text-white">Create Account</h2>
            <p className="text-gray-500">Join us to jumpstart your fitness journey</p>
          </div>
          
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div>
            <label className="block text-sm font-medium dark:text-gray-300">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-background-dark dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-gray-300">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-background-dark dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-gray-300">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-background-dark dark:text-white"
              required
            />
          </div>

          <button type="submit" className="w-full rounded-lg bg-primary py-3 font-bold text-white transition-opacity hover:opacity-90">
            Register
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Log in here
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
