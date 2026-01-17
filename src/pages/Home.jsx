import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { products as initialProducts } from '../data/ProductData';
import { useNavigate } from 'react-router-dom';

// Images Import
import bg1 from '../assets/Background img.jpg';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const searchQuery = useSelector(state => state.products?.searchQuery || "");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // new filter stocks
  const [sortBy, setSortBy] = useState('default'); 
  const [filterRating, setFilterRating] = useState(0);

  const backgroundImages = [bg1];

  useEffect(() => {
    const loadData = () => {
      const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
      if (savedProducts.length === 0) {
        localStorage.setItem('products', JSON.stringify(initialProducts));
        setProducts(initialProducts);
      } else {
        const combinedProducts = [...savedProducts];
        initialProducts.forEach(item => {
          if (!combinedProducts.find(p => p.id === item.id)) {
            combinedProducts.push(item);
          }
        });
        setProducts(combinedProducts);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    let result = [...products];

    // 1. searchQuery filter
    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // 2. category filter
    if (!searchQuery && activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    // 3. rating filter
    if (filterRating > 0) {
        result = result.filter(p => Math.floor(p.rating || 0) >= parseInt(filterRating));
    }

    // 4. price filter
    if (sortBy === 'low-to-high') {
        result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-to-low') {
        result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [searchQuery, activeCategory, products, sortBy, filterRating]);

  const handleAddToCart = (item) => {
    if (!user) {
      alert("Kindly login to your account!");
      navigate('/login');
      return;
    }
    dispatch(addToCart(item));
  };

  return (
    <div className="bg-[#FFFFF0] dark:bg-gray-950 min-h-screen pb-20 transition-colors duration-500 font-sans">

      {/* HERO SECTION */}
      <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden">
        {backgroundImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentBgIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `url(${img})`,
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)"
            }}
          ></div>
        ))}
        <div className="absolute inset-0 bg-black/20 dark:bg-black/50 transition-colors"></div>
        <div className="relative pt-20 md:pt-32 text-center z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-2xl">Fresh Plants & Seeds</h1>
          <p className="text-white text-sm md:text-lg mt-4 bg-black/40 inline-block px-6 py-2 rounded-full backdrop-blur-sm border border-white/20">
            Transform your home into a Green Heaven 🌿
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 -mt-16 relative z-20">
        {/* CATEGORY FILTERS */}
        <div className="flex justify-start md:justify-center gap-3 overflow-x-auto pb-4 no-scrollbar">
          {['All', 'Seeds', 'Plants', 'Fertilizers'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all shadow-md min-w-[120px] whitespace-nowrap border ${
                activeCategory === cat 
                  ? 'bg-green-600 text-white border-green-500 scale-105 shadow-green-200 dark:shadow-none' 
                  : 'bg-white dark:bg-gray-800 dark:text-gray-200 text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-100 dark:border-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- new filters (Price & Rating) --- */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <select 
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-xl text-xs font-bold border bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 shadow-sm outline-none cursor-pointer"
          >
            <option value="default">Sort by Price</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>

          <select 
            onChange={(e) => setFilterRating(e.target.value)}
            className="px-4 py-2 rounded-xl text-xs font-bold border bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 shadow-sm outline-none cursor-pointer"
          >
            <option value="0">All Ratings</option>
            <option value="4">4 Stars & Above</option>
            <option value="3">3 Stars & Above</option>
            <option value="2">2 Stars & Above</option>
          </select>
        </div>

        {/* PRODUCT GRID */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 p-4 flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 rounded-3xl group">

                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black bg-green-50 dark:bg-green-900/40 text-green-600 dark:text-green-400 px-2 py-1 rounded-md uppercase border border-green-100 dark:border-green-900/50">
                    {item.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${
                    item.stock > 0 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800' 
                      : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800'
                  }`}>
                    {item.stock > 0 ? `Stock: ${item.stock}` : 'Out of Stock'}
                  </span>
                </div>

                <div className="h-48 flex justify-center items-center mb-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl overflow-hidden relative border border-transparent dark:border-gray-700">
                  <img src={item.image} alt={item.name} className={`max-h-[80%] max-w-[80%] object-contain transition-transform duration-500 ${item.stock > 0 ? 'group-hover:scale-110' : 'grayscale'}`} />
                  {item.stock <= 0 && (
                    <div className="absolute inset-0 bg-black/20 dark:bg-black/40 flex items-center justify-center">
                      <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-lg">SOLD OUT</span>
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-gray-800 dark:text-gray-100 line-clamp-2 mb-1 min-h-[3rem] transition-colors">{item.name}</h3>

                {/* updated rating display */}
                <div className="flex items-center gap-1 mb-3">
                  <span className="text-yellow-400 text-sm">
                    {"★".repeat(Math.floor(item.rating || 0)) + "☆".repeat(5 - Math.floor(item.rating || 0))}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-bold">({item.rating || 0})</span>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-50 dark:border-gray-700 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 block line-through decoration-red-400">₹{Number(item.price) + 100}</span>
                    <span className="text-2xl font-black text-gray-900 dark:text-white transition-colors">₹{item.price}</span>
                  </div>

                  <button
                    disabled={item.stock <= 0}
                    onClick={() => handleAddToCart(item)}
                    className={`p-3 rounded-2xl shadow-sm transition-all ${item.stock > 0
                        ? 'bg-[#ffd814] hover:bg-[#f7ca00] active:scale-95 group-hover:rotate-6 border border-yellow-300'
                        : 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-50'
                      }`}
                  >
                    <span className="text-xl">{item.stock > 0 ? '🛒' : '🚫'}</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white/50 dark:bg-gray-800/50 rounded-3xl shadow-sm backdrop-blur-sm border border-gray-200 dark:border-gray-700 transition-colors">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-500 dark:text-gray-400 text-xl font-medium">Sorry, no products found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;