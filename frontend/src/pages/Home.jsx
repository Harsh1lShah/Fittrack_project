import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Layout>
      <div className="@container">
        <div className="@[480px]:p-4">
          <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 bg-cover bg-center bg-no-repeat @[480px]:rounded-xl p-4" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBgvtydzr2bPTFFfXCaGhSe4Fj85PkHstpzBitjWSFRrEjzd1_lsHH9gXFtdsHFkljMDfwg7Y5LE-5zragM6atUX2zrnsfGc63f03NneV0yAKKBVbXGhUKeviU_tRUYrifJ1fX5a3tcpxOe_bHQrpEyeD82c-8Cfqjj_uggdU-vtSKg5svs9qP747EBQcerkjfzLL0_m156b_f7r_HJpS8_nsBGlVuD7L28iSgQ1gVT9Q6Zq_Xg-oarrxYSsZft46mzZqIoc5gfDCA")' }}>
            <div className="flex flex-col gap-2 text-center text-white">
              <h2 className="text-4xl font-black tracking-tight @[480px]:text-5xl">
                Elevate Your Fitness Journey
              </h2>
              <p className="text-base font-normal text-gray-200 @[480px]:text-lg">
                Achieve your goals with our expert trainers and state-of-the-art facilities.
              </p>
            </div>
            <Link to="/about" className="flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-base font-bold text-white shadow-lg transition-transform hover:scale-105 @[480px]:px-6 @[480px]:py-3">
              Join Now
            </Link>
          </div>
        </div>
      </div>
      
      <section className="py-8">
        <h3 className="px-4 pb-4 text-2xl font-bold text-gray-900 dark:text-white">Our Services</h3>
        <div className="flex overflow-x-auto px-4 pb-4 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-stretch gap-4">
            <div className="flex w-64 flex-shrink-0 flex-col gap-3">
              <div className="h-48 w-full rounded-lg bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAlQyZ8OCC2Zjme5Evn10ocUDwENEe_1PF85ARyJHx4wviaZaKOJr9vBcOsWQZoQIKLL28rmwNiauhi8XRki85d59exg4TNjeJWmHrYjv1C8qPP_HEQv0WVPEUA4nxfMpawqeFMZ6N7y6OaE5rPWfCVaEZSU9a1thxgNf0qfysHvF8jEMNgGUk6DUvXL99n_rwuQGi8bKJeC-I4XgayDJhHDRNeiHKh2BgiwaCbkMlQXnpSbbHxj_49FbmIO26BUHsU3IyLCCFciws")' }}></div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Group Fitness Classes</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Join high-energy classes for a fun, effective workout.</p>
              </div>
            </div>
            <div className="flex w-64 flex-shrink-0 flex-col gap-3">
              <div className="h-48 w-full rounded-lg bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBrsZ7Md-WqqjJKxjF4fB2dWR30JC2piMcNW-WlWn7BChzFiCvjaV8MjKA341EMHzjvda1MH_LJhxdbuEPX86y6nOdRjtmONAQhybnDjyQJggjJ0EAu0QtJ--_OtFyVDJaohxagLmgRm_iegz6FT5hoO3b4fMuPetiM3o_CPSbg7wtC1eQHyls-MsppzazSq8Gn4D-h6_JKy0Cl1mZHssH9ZuhipNJVjAS9CYdNe1nD_6qE0Pp1iyY6v-S2XMJMxJcBRzsouHUEQxA")' }}></div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Personal Training</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get personalized guidance to maximize your results.</p>
              </div>
            </div>
            <div className="flex w-64 flex-shrink-0 flex-col gap-3">
              <div className="h-48 w-full rounded-lg bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBwwtRPyqjFcvkBQqrv9WDzFeoeWUP9triSrkZbAVcX-R8-qb8NNg5N6eC2njr9Fc-toQ0CezpzaFRUCKXQz4ds7bJWJx6FO15vXorK8cAHYUgll3UKQ9LeOVftSqfGIP2h-AdY2QgGJvtnJTC1g2lA_aaZ0O6MiZ4iKdGqPMCR6rqCyG6pw5EafqDU8Fi6v1OQeC-G3ezYKJc7A8v9q3He4z6U3OSGXjAyXaekKy6PI3nJciffo0QR4ppXd6datqFJk1Jhrke2ULU")' }}></div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Strength Training</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Build strength with our top-of-the-line equipment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <h3 className="pb-4 text-2xl font-bold text-gray-900 dark:text-white">Membership Plans</h3>
        <div className="grid grid-cols-1 gap-4 @[480px]:grid-cols-2 @[768px]:grid-cols-3">
          <div className="flex flex-col gap-4 rounded-xl border border-gray-200/10 dark:border-gray-700/50 bg-background-light p-6 shadow-sm dark:bg-background-dark/50">
            <div className="flex flex-col gap-1">
              <h4 className="text-lg font-bold text-primary">Basic</h4>
              <p className="flex items-baseline gap-1 text-gray-900 dark:text-white">
                <span className="text-4xl font-black">₹2000</span>
                <span className="text-base font-bold">/month</span>
              </p>
            </div>
            <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span> Access to gym facilities
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span> Group fitness classes
              </li>
            </ul>
            <Link to="/payment/basic" className="mt-auto block w-full text-center rounded-lg bg-primary/10 px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/20 dark:hover:bg-primary/30">Choose Plan</Link>
          </div>
          
          <div className="flex flex-col gap-4 rounded-xl border border-primary bg-background-light p-6 shadow-lg dark:bg-background-dark/50 relative">
            <div className="absolute top-0 right-4 -mt-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">Popular</div>
            <div className="flex flex-col gap-1">
              <h4 className="text-lg font-bold text-primary">Premium</h4>
              <p className="flex items-baseline gap-1 text-gray-900 dark:text-white">
                <span className="text-4xl font-black">₹4000</span>
                <span className="text-base font-bold">/month</span>
              </p>
            </div>
            <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span> All Basic features
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span> Personal training session
              </li>
            </ul>
            <Link to="/payment/premium" className="mt-auto block w-full text-center rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition-transform hover:scale-105">Choose Plan</Link>
          </div>
        </div>
      </section>

      <section className="py-8">
        <h3 className="px-4 pb-4 text-2xl font-bold text-gray-900 dark:text-white">Testimonials</h3>
        <div className="flex overflow-x-auto px-4 pb-4 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-start gap-6">
            <div className="flex w-72 flex-shrink-0 flex-col items-center gap-4 rounded-xl bg-background-light p-6 text-center shadow-sm dark:bg-background-dark/50">
              <img alt="Sarah M." className="h-20 w-20 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOoEKzG_iLjfkplZ4YZVWEkviIXDYgpzrgMQw-ZpRseXp7swIncra0ZFRljky140io9pIC-bEtt3nx5iehn2lCsYsBhimRwdCRgZEpuCoa9WYl5OdZ73TbkPtGo_5T-tcs_1WPwuXnLuATsGfZC2t3NTCT74O3hq5xhqGeH7wujzW9dWCLjbPyklEiBAQXyoV1liku7vyOnqTgBPDcb2EBwDq5ZeQEkqmeqWv_bJA8vJ03GtG1MTZc2fjFUErDklOLkZg-pV3WIcc" />
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Sarah M.</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">"FitLife Gym has transformed my fitness journey!"</p>
              </div>
            </div>
            <div className="flex w-72 flex-shrink-0 flex-col items-center gap-4 rounded-xl bg-background-light p-6 text-center shadow-sm dark:bg-background-dark/50">
              <img alt="David L." className="h-20 w-20 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBo-MBUwCX7nuZT6T-kmTvO95u0vkwl96GVSH6o21mhDeay29p8dNPoPg66t0Rlyv7nTvIFp0E26mIYVDSTg-wtXgfMlujFMCqTgUNF-ziKBLiYSEMzJ2OcWTxp20AEINpWxhtM_6lUYcHfoWKIE06_lb20HItAEKgrFId6uO2WIUvM-Xx7g4Zr7-lAch184304A9LzCB96OPV6v2XzDJBUdihrpamQbbl17tygM70A8hb_2sWZMATjcj55gL_tkTa4wQOUPWGj0GY" />
              <div>
                <p className="font-bold text-gray-900 dark:text-white">David L.</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">"I've seen incredible results with personal training."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Home;
