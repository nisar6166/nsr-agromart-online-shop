import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      // Checking if the item is already in the cart
      const itemIndex = state.items.findIndex((item) => String(item.id) === String(action.payload.id));
      
      // Fetching stock levels from the product data (synced from the admin panel)
      // Defaulting to 0 if stock is not provided
      const productStock = Number(action.payload.stock) || 0;

      if (itemIndex >= 0) {
        // If the item is already in the cart, increase the quantity (only if it's within the available stock)
        if (state.items[itemIndex].quantity < productStock) {
          state.items[itemIndex].quantity += 1;
        } else {
          alert(`Sorry! This product only has a stock of ${productStock}.`);
        }
      } else {
        // 
        if (productStock > 0) {
          state.items.push({ ...action.payload, quantity: 1 });
        } else {
          alert("Sorry, this product is currently out of stock (Out of Stock).");
        }
      }
    },

    incrementQuantity: (state, action) => {
      const id = action.payload.id || action.payload;
      const item = state.items.find((i) => String(i.id) === String(id));
      
      if (item) {
        const productStock = Number(item.stock) || 0;
        if (item.quantity < productStock) {
          item.quantity += 1;
        } else {
          alert(`Maximum stock (${productStock}) reached!`);
        }
      }
    },

    decrementQuantity: (state, action) => {
      const id = action.payload.id || action.payload;
      const item = state.items.find((i) => String(i.id) === String(id));
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload.id || action.payload;
      state.items = state.items.filter((item) => String(item.id) !== String(id));
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;