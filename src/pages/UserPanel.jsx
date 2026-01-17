import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';

const UserPanel = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Fetching the live search term from Redux
  const searchQuery = useSelector(state => state.products.searchQuery);
  const dispatch = useDispatch();

  //  To fetch data on load
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(savedProducts);
    setFilteredProducts(savedProducts);
  }, []);

  // Filter during live search
  useEffect(() => {
    let result = products;

    // Apply filter only when there is a search query
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setActiveCategory('All'); // Resetting category to 'All' when searching
    } 
    
    // category filter
    else if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    setFilteredProducts(result);
  }, [searchQuery, activeCategory, products]);

  // when category selecting
  const filterByCategory = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* HERO SECTION */}
      <section className="px-10 py-16 bg-[#f9f9f9] rounded-b-[50px] text-center">
        <h1 className="text-5xl font-black text-gray-900">AgroMart <span className="text-green-600">Store</span></h1>
        <p className="text-gray-500 mt-2">Explore our organic collection</p>
      </section>

      {/* CATEGORY BUTTONS */}
      <div className="flex justify-center gap-3 mt-10 overflow-x-auto px-5">
        {['All', 'Seeds', 'Plants', 'Fertilizers'].map((cat) => (
          <button 
            key={cat} 
            onClick={() => filterByCategory(cat)}
            className={`px-6 py-2 rounded-full border text-sm font-bold transition-all shrink-0 ${
              activeCategory === cat ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCT LIST */}
      <div className="px-10 py-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded-[30px] shadow-sm hover:shadow-lg transition group">
              <div className="aspect-square rounded-[20px] overflow-hidden bg-gray-50 mb-4">
                <img 
                  src={product.image || 'https://via.placeholder.com/400'} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                />
              </div>
              <h3 className="font-bold text-xl">{product.name}</h3>
              <p className="text-gray-400 text-sm">{product.category}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-black">₹{product.price}</span>
                <button 
                  onClick={() => dispatch(addToCart(product))}
                  className="bg-black text-white w-10 h-10 rounded-full text-xl flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-400">
             "Sorry, we couldn't find any products named {searchQuery}. " 
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPanel;