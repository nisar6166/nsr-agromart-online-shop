import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, incrementQuantity, decrementQuantity } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';
import Login from './Login'; 
const CartList = () => {
  // Fetching login status from Redux
  const { user } = useSelector((state) => state.auth);
  
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // If not logged in, show the login page instead of the cart page
  if (!user) {
    return <Login />;
  }

  // to calculate total amount
  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  return (
    <div className="p-4 md:p-8 bg-[#eaeded] dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">

        {/* left side product list */}
        <div className="flex-1 bg-white dark:bg-gray-800 p-6 shadow-md rounded-2xl border border-gray-100 dark:border-gray-700">
          <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-6 border-b pb-4 dark:border-gray-700">
            Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-3xl">
              <p className="text-xl text-gray-600 dark:text-gray-400">Your cart is empty! 🛒</p>
              <button
                onClick={() => navigate('/')}
                className="mt-4 bg-green-600 text-white px-8 py-2 rounded-full font-bold hover:bg-green-700 transition shadow-lg"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row justify-between items-center border-b dark:border-gray-700 py-6 gap-4 group">
                  <div className="flex items-center gap-4 w-full">
                    <div className="bg-gray-50 dark:bg-gray-900 p-2 rounded-xl">
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-contain group-hover:scale-105 transition" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg dark:text-white">{item.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-green-600 dark:text-green-400 font-bold">₹{item.price}</p>
                        <span className="text-[10px] bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md font-bold">
                          Stock: {item.stock}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-4 bg-gray-50 dark:bg-gray-700 w-fit rounded-xl px-2 py-1 border dark:border-gray-600">
                        <button
                          onClick={() => dispatch(decrementQuantity(item.id))}
                          className="w-10 h-10 flex items-center justify-center font-bold text-xl hover:bg-white dark:hover:bg-gray-600 rounded-lg transition shadow-sm active:scale-90"
                        >
                          -
                        </button>
                        <span className="font-black text-lg dark:text-white min-w-[30px] text-center">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => dispatch(incrementQuantity(item))}
                          className={`w-10 h-10 flex items-center justify-center font-bold text-xl rounded-lg transition shadow-sm active:scale-90 ${
                            item.quantity >= item.stock 
                            ? 'bg-red-50 text-red-300 cursor-not-allowed' 
                            : 'hover:bg-white dark:hover:bg-gray-600'
                          }`}
                        >
                          +
                        </button>
                      </div>
                      {item.quantity >= item.stock && (
                        <p className="text-[10px] text-red-500 mt-1 font-bold italic">Maximum stock reached!</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6">
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Total</p>
                      <p className="font-black text-2xl text-gray-800 dark:text-white">
                        ₹{item.price * (item.quantity || 1)}
                      </p>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-full transition"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* വലത് ഭാഗം: Summary Box */}
        {cartItems.length > 0 && (
          <div className="w-full md:w-80 bg-white dark:bg-gray-800 p-6 h-fit shadow-xl rounded-3xl border-t-8 border-[#ffd814]">
            <h2 className="text-2xl font-black text-gray-800 dark:text-white mb-6 italic tracking-tight underline decoration-[#ffd814]">Order Summary</h2>

            <div className="flex justify-between mb-4 dark:text-gray-300 text-sm font-bold">
              <span>Total Items:</span>
              <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
                {cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}
              </span>
            </div>

            <div className="border-t dark:border-gray-700 pt-6">
              <div className="flex flex-col mb-6">
                <span className="text-sm text-gray-400">Grand Total:</span>
                <span className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">₹{totalAmount}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-black py-4 rounded-2xl font-black shadow-lg shadow-yellow-100 dark:shadow-none transition active:scale-95 mb-4 text-lg"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => {
                  if(window.confirm("Clear your cart?")) dispatch(clearCart());
                }}
                className="w-full text-gray-400 hover:text-red-500 text-xs font-bold transition flex items-center justify-center gap-1"
              >
                <span>✕</span> Clear All Items
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartList;