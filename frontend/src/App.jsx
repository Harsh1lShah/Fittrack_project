import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CheckIn from './pages/CheckIn';
import Chat from './pages/Chat';
import Payment from './pages/Payment';
import Classes from './pages/Classes';
import Trainers from './pages/Trainers';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/payment/:plan" element={<Payment />} />
          <Route path="/schedule" element={<Classes />} />
          <Route path="/trainers" element={<Trainers />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
