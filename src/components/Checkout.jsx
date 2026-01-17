import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../features/cartSlice';
import Login from '../pages/Login';

const Checkout = () => {
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) {
    return <Login />;
  }

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // updating stocks
    const allProducts = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = allProducts.map(product => {
      const cartItem = cartItems.find(item => String(item.id) === String(product.id));
      if (cartItem) {
        const newStock = product.stock - cartItem.quantity;
        return { ...product, stock: newStock > 0 ? newStock : 0 };
      }
      return product;
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // saving orders
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrder = {
      id: Date.now(),
      userEmail: user.email,
      items: cartItems,
      total: totalAmount,
      date: new Date().toLocaleDateString(),
      status: 'Ordered'
    };

    localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));
    
    dispatch(clearCart());
    alert('Order successfully completed!');
    navigate('/orders'); //direct entering order page
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-gray-900 min-h-screen">
        <h2 className="text-2xl font-bold text-gray-400">Cart is empty!</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-green-600 font-bold underline">Back to home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent dark:bg-gray-900 p-6 md:p-10 transition-all duration-300">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 h-fit">
          <h2 className="text-2xl font-black mb-6 text-gray-800 dark:text-white italic underline decoration-yellow-400">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-xl">
                <div className="flex flex-col">
                  <span className="font-bold text-gray-700 dark:text-gray-200">{item.name}</span>
                  <span className="text-xs text-gray-400 font-bold italic">Qty: {item.quantity || 1}</span>
                </div>
                <span className="font-black text-gray-900 dark:text-white">₹{item.price * (item.quantity || 1)}</span>
              </div>
            ))}
          </div>
          <div className="border-t-2 border-dashed mt-6 pt-6 font-black text-2xl flex justify-between items-center text-gray-900 dark:text-white">
            <span>Total:</span>
            <span className="text-green-600 dark:text-green-400">₹{totalAmount}</span>
          </div>
        </div>

        {/* Delivery Details Form */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-black mb-6 text-gray-800 dark:text-white">Delivery Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-black text-gray-400 uppercase ml-2">Full Name</label>
              <input type="text" placeholder="Ex: John Doe" className="w-full p-4 border-2 border-gray-50 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-2xl outline-none focus:border-green-500 dark:text-white transition-all font-bold" required />
            </div>
            <div>
              <label className="text-xs font-black text-gray-400 uppercase ml-2">Shipping Address</label>
              <textarea placeholder="Complete Address" rows="3" className="w-full p-4 border-2 border-gray-50 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-2xl outline-none focus:border-green-500 dark:text-white transition-all font-bold" required></textarea>
            </div>
            <div>
              <label className="text-xs font-black text-gray-400 uppercase ml-2">Mobile Number</label>
              <input type="tel" placeholder="10-digit number" className="w-full p-4 border-2 border-gray-50 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-2xl outline-none focus:border-green-500 dark:text-white transition-all font-bold" required pattern="[0-9]{10}" />
            </div>
            
            <button type="submit" className="w-full bg-green-600 text-white py-5 rounded-3xl font-black text-xl hover:bg-black transition-all shadow-xl active:scale-95">
              Confirm Order
            </button>
            <p className="text-center text-[10px] text-gray-400 font-bold uppercase mt-4">Cash on delivery only</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;