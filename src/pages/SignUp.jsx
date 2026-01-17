import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'User' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
    const isUserExist = existingUsers.some(user => user.email === formData.email);
    
    if (isUserExist) {
      alert("This email is already registered!");
      return;
    }

    const updatedUsers = [...existingUsers, formData];
    localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
    
    alert("Registration Successful! Please Login.");
    navigate('/login');
  };

  return (
    /* Applied bg-transparent to display the Ivory White background from App.css */
    <div className="flex justify-center items-center h-screen bg-transparent dark:bg-gray-900 transition-colors duration-300 px-4">
      
      <form 
        onSubmit={handleSubmit} 
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border-t-4 border-green-500 transition-all border-x border-b border-gray-100 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold mb-6 text-green-800 dark:text-green-400 text-center">Join AgroMart</h2>
        
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Full Name" 
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400" 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
          />
          
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            required 
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400" 
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
            required 
          />
          
          <select 
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-green-500 cursor-pointer" 
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            value={formData.role}
          >
            <option value="User">Register as Customer (User)</option>
            <option value="Admin">Register as Seller (Admin)</option>
          </select>
        </div>
        
        <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition font-bold shadow-lg active:scale-95 mt-6">
          Create Account
        </button>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account? 
          <Link to="/login" className="text-green-600 dark:text-green-400 font-bold ml-1 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;