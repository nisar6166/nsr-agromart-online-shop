import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank You ${formData.name}, We have received your message. We will get back to you soon!`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 dark:text-white mb-4">Contact Us</h1>
          <p className="text-gray-500 dark:text-gray-400">Any doubts about our services? Feel free to contact us through any of the channels below.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 bg-white dark:bg-gray-800 p-8 md:p-12 rounded-[40px] shadow-sm">
          
          {/* 1. Contact Info Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Get in Touch</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                AgroMart is always with you for all your farming needs and queries.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 flex items-center justify-center rounded-2xl text-2xl">📍</div>
                <div>
                  <h4 className="font-bold dark:text-white">Location</h4>
                  <p className="text-sm text-gray-500">AgroMart Head Office, Kottakkal, Malappuram, Kerala, India</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 flex items-center justify-center rounded-2xl text-2xl">📞</div>
                <div>
                  <h4 className="font-bold dark:text-white">Phone</h4>
                  <p className="text-sm text-gray-500">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 flex items-center justify-center rounded-2xl text-2xl">✉️</div>
                <div>
                  <h4 className="font-bold dark:text-white">Email</h4>
                  <p className="text-sm text-gray-500">support@agromart.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Contact Form Section */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-8 rounded-3xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold mb-2 dark:text-gray-200">Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white" 
                  placeholder="Your Name" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 dark:text-gray-200">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white" 
                  placeholder="yourname@gmail.com" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 dark:text-gray-200">Message</label>
                <textarea 
                  rows="4" 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white" 
                  placeholder="How can we help you?" 
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;