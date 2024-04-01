import { createSlice } from '@reduxjs/toolkit';

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
  },
  reducers: {
   addItemToWishlist: (state, action) => {
      // Cek jika item sudah ada dalam wishlist
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (!existingItem) {
        // Item belum ada, tambahkan ke wishlist
        state.items.push(action.payload);
      } 
    },
    removeItemFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
  },
});

export const { addItemToWishlist, removeItemFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;