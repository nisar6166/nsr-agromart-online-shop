import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const OrderHistory = () => {
  const [history, setHistory] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    if (user && user.email) {
      // Filtering orders for the logged-in user
      const userHistory = savedOrders.filter(order => order.userEmail === user.email);
      setHistory(userHistory);
    }
  }, [user]);

  const handleCancelOrder = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
      const updatedAllOrders = allOrders.filter(order => order.id !== orderId);
      
      // Updating LocalStorage and state
      localStorage.setItem('orders', JSON.stringify(updatedAllOrders));
      setHistory(history.filter(order => order.id !== orderId));
      
      alert("Order cancelled successfully.");
    }
  };

  return (
    <div className="p-4 md:p-8 bg-transparent dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-black text-gray-800 dark:text-white mb-8 border-l-4 border-yellow-500 pl-4 italic">
          Order History
        </h1>

        {history.length > 0 ? (
          <div className="grid gap-6">
            {history.map((order) => (
              <div 
                key={order.id} 
                className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">
                        ID: {order.id}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold">{order.date}</span>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mt-2">
                      Total: ₹{order.total}
                    </h3>
                  </div>
                  
                  {/* Cancel Button */}
                  <button 
                    onClick={() => handleCancelOrder(order.id)}
                    className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50 px-4 py-2 rounded-2xl font-bold text-sm hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-95"
                  >
                    Cancel Order
                  </button>
                </div>

                {/* Items List Box */}
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-2xl space-y-2 border border-gray-100 dark:border-gray-600">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Purchased Items:</p>
                  {order.items && order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="font-bold text-gray-700 dark:text-gray-200">
                        {item.name} <span className="text-yellow-600 dark:text-yellow-400 ml-1">x{item.quantity}</span>
                      </span>
                      <span className="font-black text-gray-900 dark:text-white">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-bold text-green-600 uppercase tracking-tighter">Status: {order.status || "Ordered"}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold italic">Payment: Cash on Delivery</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
            <p className="text-gray-400 dark:text-gray-500 font-bold text-lg">No previous orders found!</p>
            <button 
              onClick={() => window.location.href='/'} 
              className="mt-4 text-green-600 font-bold underline"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;