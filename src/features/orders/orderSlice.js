import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit'
import axios from 'axios';

export const getOrders = createAsyncThunk('orders/getOrders', async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders`);
    const data = await response.data;
    return data;
});

const orderAdapter = createEntityAdapter({
    selectId: (order) => order.id,
});

const initialState = orderAdapter.getInitialState({
    status: 'idle',
    error: null
});

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getOrders.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getOrders.fulfilled, (state, action) => {
            state.status = 'succeeded';
            orderAdapter.setAll(state, action.payload);
        })
        .addCase(getOrders.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    },
});


export default orderSlice.reducer
export const { selectAll: selectAllOrders, selectById: selectOrderById } = orderAdapter.getSelectors((state) => state.orders);