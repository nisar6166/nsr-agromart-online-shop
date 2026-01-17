import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* 1. Header Section */}
      <section className="relative h-[400px] flex items-center justify-center text-center bg-green-900 text-white px-6">
        <div className="absolute inset-0 opacity-40 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070" 
            alt="Garden" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-black mb-4">Our Green Story</h1>
          <p className="text-xl text-green-100 italic">"Bringing nature closer to your home, one plant at a time."</p>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Who We Are</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            AgroMart is more than just a plant nursery. It is an initiative started with the goal of providing high-quality seeds, plants, and fertilizers under one roof for those who love farming. 
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl">
              <h3 className="font-bold text-green-700 dark:text-green-400">100% Organic</h3>
              <p className="text-sm text-gray-500">Purely natural products</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl">
              <h3 className="font-bold text-green-700 dark:text-green-400">Fast Delivery</h3>
              <p className="text-sm text-gray-500">Safe and quick shipping</p>
            </div>
          </div>
        </div>
        <div className="rounded-[40px] overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=2071" 
            alt="Farmers" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 3. Features Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black dark:text-white">Why Choose AgroMart?</h2>
          <div className="h-1 w-20 bg-green-500 mx-auto mt-4"></div>
        </div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { title: "Quality Seeds", desc: "High germination rate seeds for your home garden." },
            { title: "Expert Care", desc: "Guidance on how to nurture your plants properly." },
            { title: "Community", desc: "Joining hands with local farmers for fresh products." }
          ].map((feature, i) => (
            <div key={i} className="bg-white dark:bg-gray-700 p-8 rounded-3xl shadow-sm hover:shadow-md transition">
              <div className="text-3xl mb-4">🌿</div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-300 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Call to Action */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl font-bold mb-6 dark:text-white">Ready to start your garden?</h2>
        <button 
          onClick={() => navigate('/user-panel')}
          className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-full font-bold text-lg transition shadow-lg"
        >
          Explore Products
        </button>
      </section>
    </div>
  );
};

export default About;