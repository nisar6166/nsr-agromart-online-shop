import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];

    const user = allUsers.find(u => u.email === credentials.email && u.password === credentials.password);

    if (user) {
      dispatch(login(user));
      if (user.role === 'Admin') navigate('/admin-panel');
      else navigate('/');
    } else {
      alert("Invalid Email or Password!");
    }
  };

  return (
    // Added dark:bg-gray-900 to the main background
    <div className="flex justify-center items-center h-screen bg-green-50 dark:bg-gray-900 transition-colors duration-300">
      
      {/* Added dark:bg-gray-800 and dark:border-gray-700 to the Form Card */}
      <form 
        onSubmit={handleLogin} 
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-96 border-b-4 border-green-600 dark:border-green-500 border border-transparent transition-all"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700 dark:text-green-400">
          AgroMart Login
        </h2>

        {/* Added dark:bg-gray-700 and dark:text-white to the input fields */}
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 mb-4 border rounded-lg outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} 
          required
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-3 mb-4 border rounded-lg outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} 
          required
        />

        <button className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-bold shadow-lg active:scale-95 transition-all">
          Login
        </button>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account? 
          <Link to="/register" className="text-green-600 dark:text-green-400 font-bold ml-1 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;