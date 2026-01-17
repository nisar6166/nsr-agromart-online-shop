import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import cartReducer from '../features/cartSlice';
import adminReducer from "../features/adminSlice";
import productReducer from "../features/productSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    admin: adminReducer,
    products: productReducer,
  },
});