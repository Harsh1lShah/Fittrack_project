import React, { useState, useContext, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { API_URL } from '../config';


const Chat = () => {
  const { token, user } = useContext(AuthContext);
  const location = useLocation();
  const trainerName = location.state?.trainerName;
  
  const [messages, setMessages] = useState([
    { text: trainerName ? `Hi there! I'm ${trainerName}. How can I help you reach your fitness goals today?` : "Hi there! I'm your FitTrack Assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !token) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/ai/chat`, { message: userMessage, trainerName }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(prev => [...prev, { text: res.data.reply, isBot: true }]);

    } catch (err) {
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting to the AI brain.", isBot: true }]);
    }
    setLoading(false);
  };

  if(!user) return <div className="p-4 text-center mt-10">Please login to ask the assistant.</div>;

  return (
    <Layout title={trainerName ? `Chat with ${trainerName.split(' ')[0]}` : "AI Assistant"}>
      <div className="flex flex-col h-[80vh] bg-background-light dark:bg-background-dark/50">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[75%] rounded-2xl p-3 shadow-sm ${msg.isBot ? 'bg-primary/10 text-gray-800 dark:text-gray-200 border border-primary/20' : 'bg-primary text-white'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
               <div className="bg-primary/10 text-gray-500 rounded-2xl p-3 italic text-sm">Typing...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark z-40 fixed bottom-16 left-0 right-0 w-full mb-safari">
          <form onSubmit={handleSend} className="flex gap-2 w-full max-w-3xl mx-auto">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about workouts, diet, tips..."
              className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-background-dark dark:text-white"
            />
            <button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 text-white rounded-full w-10 h-10 flex items-center justify-center transition-opacity disabled:opacity-50">
              <span className="material-symbols-outlined text-xl">send</span>
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
