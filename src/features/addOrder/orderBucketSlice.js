import { createSlice } from "@reduxjs/toolkit";

export const orderBucket = createSlice({
    name: 'orderBucket',
    initialState: {
        items: [],
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
          resetItem: (state) => {
            state.items = [];
          }
      }
})

export const { addItem, resetItem } = orderBucket.actions;
export default orderBucket.reducer;