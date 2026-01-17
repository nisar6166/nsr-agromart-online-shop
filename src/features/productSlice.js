import { createSlice } from '@reduxjs/toolkit';
// ProductData importing
import { products as initialProducts } from '../data/ProductData';

// 
const savedProducts = JSON.parse(localStorage.getItem('products')) || initialProducts;

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: savedProducts, // Storing all products here
    searchQuery: '',      // search query
  },
  reducers: {
    // to update search query
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    // Updating the state when a new product is added via the admin panel
    setAllProducts: (state, action) => {
      state.items = action.payload;
    },
    // to clear search
    clearSearch: (state) => {
      state.searchQuery = '';
    }
  }
});

export const { setSearchQuery, clearSearch, setAllProducts } = productSlice.actions;
export default productSlice.reducer;