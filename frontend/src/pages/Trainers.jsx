import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import { useMembership } from '../hooks/useMembership';
import { useNavigate } from 'react-router-dom';

const Trainers = () => {
  const { user } = useContext(AuthContext);
  const { membership, loading: memLoading } = useMembership();
  const navigate = useNavigate();

  const dummyTrainers = [
    { id: 1, name: 'Alex Johnson', specialty: 'HIIT & Endurance', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBwZ-W6R7gR1m5s_A-Q8D9zKxI4t3lV_c_6_5K_C9_L8Z-pB8M1N1f_L-N4_S4x_8VqT6M6N1J5g_V-F3N_M_YV6wL4X_c2C8G5W_wR2V_Z3F9A-J9_C7L_H-T_Q7S4g_X2n_L3m9mX_D2J7w9H4g8q_m_R_W_f2u_r_U', description: 'Alex pushes you to your limits with high-intensity interval training.' },
    { id: 2, name: 'Sarah Smith', specialty: 'Yoga & Flexibility', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy_P_R0j5tH5w_E9-R_W_F6r_Z_F_B_j_S2-w2m_wZ5v_Z_Z_T_D_x4V_L4X2r_D_M_t_y_w4q_B8N_E_F8R_E_S_P4M9X_W9v_A5T4q2L_A5X_W_J_J4d4F_q2H_m_P5r_Z5S_G_T_Y_l5M2u_E9L_H2H_R6', description: 'Sarah helps you find balance and flexibility through mindful practice.' },
    { id: 3, name: 'Mike Davis', specialty: 'Strength Training', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy_Z_Y6Y5V9m7Q3K2E_W5T_V_R_Y_U_N_Y5W4s3r_A_G8Y_X_Z_j_T4H4W_H4m_S_x6a9P_I4P8U_J8w_t_R9h_F_U5j5M_A_a4z4y2S9U9V4J_B_s_R_L9F_k_I5K3D4r9O_x_X_L8Y_e_Q6v_V2B8R5u', description: 'Mike focuses on building pure muscle and mastering lifting technique.' },
    { id: 4, name: 'Emma Wilson', specialty: 'Cardio Core', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1_Y2S9C8a_W_C_x_F_X_w_W_z3T2W_Y_U_K4R_W_K_m_G_S6F_G_G4m_w_v2N8K_L_G9K_x_k_F_O1N_H6I_H1A_X8I9P5N_w_Y_s4T_Z_B_X8T6S_G8z_P5E4D8e1Y_f5u_I_W_t_p5S_j_H8s_O_d8L', description: 'Emma keeps your heart rate soaring while strengthening your core.' }
  ];

  const hasMembership = !memLoading && membership && membership.status === 'active';

  const handleTalkToTrainer = (trainerName) => {
    if (!user) {
        navigate('/login');
        return;
    }
    if (!hasMembership) {
        alert("You need an active membership to talk to our trainers!");
        navigate('/#pricing');
        return;
    }
    // Navigate to Chat page with the trainerName in the state to personalize the prompt
    navigate('/chat', { state: { trainerName } });
  };

  return (
    <Layout title="Our Trainers">
      <div className="p-4 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Meet the Experts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dummyTrainers.map(t => (
               <div key={t.id} className="bg-white dark:bg-background-dark/80 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row">
                 <div className="md:w-1/3 bg-gray-200 h-48 md:h-auto bg-cover bg-center" style={{ backgroundImage: `url("${t.image}")` }}></div>
                 <div className="p-4 md:w-2/3 flex flex-col justify-between">
                   <div>
                     <h3 className="font-bold text-xl text-gray-900 dark:text-white">{t.name}</h3>
                     <p className="text-primary font-semibold text-sm mb-2">{t.specialty}</p>
                     <p className="text-gray-600 dark:text-gray-400 text-sm">{t.description}</p>
                   </div>
                   <button 
                     onClick={() => handleTalkToTrainer(t.name)} 
                     className="mt-4 flex items-center justify-center gap-2 bg-gray-900 dark:bg-gray-100 dark:text-gray-900 text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
                   >
                     <span className="material-symbols-outlined text-sm">chat</span>
                     Chat with {t.name.split(' ')[0]}
                   </button>
                 </div>
               </div>
            ))}
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Trainers;
