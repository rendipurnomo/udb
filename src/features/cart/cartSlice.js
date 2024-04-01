import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalAmount: 0,
  },
  reducers: {
    addItem: (state, action) => {
      // Cek jika item sudah ada dalam cart
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingIndex >= 0) {
        // Item sudah ada, update quantity atau tindakan lain sesuai kebutuhan
        state.items[existingIndex].quantity += 1; // Contoh jika menggunakan quantity
      } else {
        // Item belum ada, tambahkan ke cart
        state.items.push({...action.payload, quantity: +1});
        state.totalAmount += action.payload.amount;
        // Tambahkan property quantity jika diperlukan
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    resetItem: (state) => {
      state.items = [];
    }
  },
});

export const { addItem, removeItem, resetItem } = cartSlice.actions;
export default cartSlice.reducer;