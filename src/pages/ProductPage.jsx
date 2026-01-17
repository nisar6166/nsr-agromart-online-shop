import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';

const ProductPage = () => {
  const dispatch = useDispatch();
  
  const products = JSON.parse(localStorage.getItem('products')) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {products.map((item) => (
        <div key={item.id} className="bg-white dark:bg-gray-700 p-5 flex flex-col border border-gray-200 dark:border-gray-600">
          <div className="h-40 flex justify-center items-center mb-4">
            <img src={item.image} alt="" className="max-h-full max-w-full object-contain" />
          </div>
          <h3 className="font-bold text-lg dark:text-white line-clamp-1">{item.name}</h3>
          <p className="text-[#f3a847]">⭐⭐⭐⭐</p>
          <div className="my-2">
            <span className="text-sm font-bold align-top dark:text-white">₹</span>
            <span className="text-2xl font-bold dark:text-white">{item.price}</span>
          </div>
          <button 
            onClick={() => dispatch(addToCart(item))}
            className="bg-[#ffd814] hover:bg-[#f7ca00] py-2 rounded-full border border-[#fcd200] text-sm font-medium mt-auto"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};