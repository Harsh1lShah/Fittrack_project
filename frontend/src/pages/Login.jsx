import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Layout from '../components/Layout';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('john@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Layout title="Login">
      <div className="flex flex-col items-center justify-center p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-sm mt-12 space-y-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold dark:text-white">Welcome Back</h2>
            <p className="text-gray-500">Log in to track your fitness journey</p>
          </div>
          
          {error && <p className="text-red-500 text-center">{error}</p>}

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
            Login
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-bold hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
