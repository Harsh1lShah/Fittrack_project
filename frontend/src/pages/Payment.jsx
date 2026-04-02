import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { API_URL } from '../config';


const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Payment = () => {
  const { plan } = useParams();
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const planDetails = {
    basic: { name: 'Basic Plan', price: 2000 },
    premium: { name: 'Premium Plan', price: 4000 },
  };

  const selectedPlan = planDetails[plan] || planDetails.basic;

  const handlePayment = async () => {
    setLoading(true);
    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      setLoading(false);
      return;
    }

    try {
      // Create Order on backend
      const { data: orderData } = await axios.post(
        `${API_URL}/api/payment/create-order`, 
        { amount: selectedPlan.price * 100 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      
      const options = {
        key: orderData.razorpay_key_id, 
        amount: orderData.amount, 
        currency: orderData.currency,
        name: "FitTrack Gym",
        description: `Payment for ${selectedPlan.name}`,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgvtydzr2bPTFFfXCaGhSe4Fj85PkHstpzBitjWSFRrEjzd1_lsHH9gXFtdsHFkljMDfwg7Y5LE-5zragM6atUX2zrnsfGc63f03NneV0yAKKBVbXGhUKeviU_tRUYrifJ1fX5a3tcpxOe_bHQrpEyeD82c-8Cfqjj_uggdU-vtSKg5svs9qP747EBQcerkjfzLL0_m156b_f7r_HJpS8_nsBGlVuD7L28iSgQ1gVT9Q6Zq_Xg-oarrxYSsZft46mzZqIoc5gfDCA", 
        order_id: orderData.id, 
        handler: async function (response) {
          try {
            await axios.post(
              `${API_URL}/api/payment/verify`,
              {
                 razorpay_order_id: response.razorpay_order_id,
                 razorpay_payment_id: response.razorpay_payment_id,
                 razorpay_signature: response.razorpay_signature,
                 planType: plan
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            alert(`Payment Successful! Welcome to ${selectedPlan.name}!`);
            navigate('/dashboard');
          } catch(err) {
            alert('Verification failed. Please contact support.');
          }
        },
        prefill: {
          name: user?.name || "Member Name",
          email: user?.email || "member@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#4F46E5"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response){
          alert(`Payment failed. ${response.error.description}`);
      });
      paymentObject.open();

    } catch(err) {
      alert(err.response?.data?.message || 'Error occurred during checkout order creation.');
    }
    setLoading(false);
  };

  return (
    <Layout title="Checkout">
      <div className="flex justify-center p-4">
        <div className="w-full max-w-md mt-12 bg-white dark:bg-background-dark/80 backdrop-blur-sm rounded-xl border border-gray-200/10 dark:border-gray-700/50 shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Complete Your Subscription</h2>
          
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Plan Focus</span>
              <span className="font-bold text-gray-900 dark:text-white">{selectedPlan.name}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Billing Cycle</span>
              <span className="font-bold text-gray-900 dark:text-white">Monthly</span>
            </div>
            <div className="h-px bg-gray-200 dark:bg-gray-700 my-4"></div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900 dark:text-white">Total</span>
              <span className="text-2xl font-black text-primary">₹{selectedPlan.price}</span>
            </div>
          </div>

          <button 
            onClick={handlePayment} 
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold transition-colors disabled:opacity-50"
          >
            {loading ? 'Initiating...' : 'Pay with Razorpay'}
          </button>
          <div className="mt-4 text-center">
             <span className="text-xs text-gray-500 dark:text-gray-400">Secured via Razorpay API • Test Mode Enabled</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
