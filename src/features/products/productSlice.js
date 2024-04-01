import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk('products/getProducts', async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
    const data = await response.data;
    return data;
});

const productAdapter = createEntityAdapter({
    selectId: (product) => product.id
});

const initialState = productAdapter.getInitialState({
    status: 'idle',
    error: null
});

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                productAdapter.setAll(state, action.payload);
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export default productSlice.reducer

export const { selectAll: selectAllProducts, selectById: selectProductById } = productAdapter.getSelectors((state) => state.products)