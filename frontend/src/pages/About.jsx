import React from 'react';
import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout title="About Us">
      <div className="@container p-4">
        <div className="flex h-56 w-full flex-col justify-end overflow-hidden rounded-xl bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBV3IV7jGjDt7_cB1Ag9DrKZcZASGlrFUTzqDIFEaWEjaXyqS4NPOXSWfwZMJoVSYpuYIY8PJsz2XqzHPmMHHeqzGxN_7q-srTYn3szVK99JThKkGOZFixe04lywgEq0w49kqRtmZWhDs-FQfxGhkw2bFx5_jWF2LDZxssta9N3wlzzXMUgf1_UezlLDjx4PGBQQ5axUkOSrTWdT2rZho3Ci_Z4K3nuUZLVpzUEepJToJh3F_8fIc6hfrfhdzo5-NDcQWm8Fr3CHv8")' }}></div>
      </div>
      
      <section className="px-4 pb-6">
        <h2 className="text-2xl font-bold">Our Mission</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          At FitLife Gym, our mission is to empower individuals to achieve their fitness goals through personalized training, state-of-the-art facilities, and a supportive community. We are committed to providing a welcoming environment where everyone can thrive, regardless of their fitness level.
        </p>
      </section>

      <section className="pb-6">
        <h2 className="px-4 text-2xl font-bold">Meet Our Trainers</h2>
        <div className="mt-4 flex overflow-x-auto px-4 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex space-x-4">
            <div className="flex w-40 flex-shrink-0 flex-col gap-3">
              <div className="aspect-square w-full rounded-lg bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA3GdGBirKDPSLsDALgie6HlPyWxxCPPrgnWwWVXk10MYFkN0_Z5dUNt7BGmcJ1gv_rLAY-a2OLusDzswGdo4UqZFTORiN3WaoiicnMiFYqwHBIOfR9WIWhatv1sGTPzXUGfXOONmkkiyfQY04ZtwwQSPfJBM3HXgEk32V04TrspjLSl8r_oxUF6PhILXvba8NAuQ23FcG-D6GO-HT_jbTc_HWoD5I-bVo0udoWjrxr4iQbkZLyePzzFEhAK6IQLfrwXb0UAwjiDJw")' }}></div>
              <div>
                <p className="font-medium">Alex Johnson</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Certified Personal Trainer</p>
              </div>
            </div>
            <div className="flex w-40 flex-shrink-0 flex-col gap-3">
              <div className="aspect-square w-full rounded-lg bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDIjSMJi2cFe4e6tA2ZI3L9S_iXrdH6wmr6DOUe1O5WNomwumJ1e7JegshxAZpE1DPVetNBTYmEUAQGjYTvpC27KDRgWjqIputrrcxYG_DQsMO1z22ksjHsRaCwvbTugBT2HraGnR604fcntbVzV8xAXOjRnzJ5uB7LR93QXU91HEJabOI2Tg2Gj6jcnitLs2QnZ95T2XePiKBZouGljC0uWSKv8U8xEXLAjGYL0jk2jcSUgoup8mVVteiVYILSLrvKTfDOqXRZiZo")' }}></div>
              <div>
                <p className="font-medium">Sarah Williams</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Yoga Instructor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8">
        <h2 className="text-2xl font-bold">Our Facilities</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-lg bg-primary/10 p-4 dark:bg-primary/20">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 dark:bg-primary/30">
              <span className="material-symbols-outlined text-primary"> fitness_center </span>
            </div>
            <h3 className="font-bold text-gray-800 dark:text-gray-200">State-of-the-Art Equipment</h3>
          </div>
          <div className="flex items-center gap-4 rounded-lg bg-primary/10 p-4 dark:bg-primary/20">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 dark:bg-primary/30">
              <span className="material-symbols-outlined text-primary"> self_improvement </span>
            </div>
            <h3 className="font-bold text-gray-800 dark:text-gray-200">Spacious Yoga Studio</h3>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
