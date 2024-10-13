// storeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API URL
const API_URL = 'https://surprize.uz/api/store';

// Token olish uchun helper function
const getToken = () => localStorage.getItem('token');

// GET: Barcha do'konlarni olish
export const fetchStores = createAsyncThunk('store/fetchStores', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

// GET: Do'konni ID bo'yicha olish
export const fetchStoreById = createAsyncThunk('store/fetchStoreById', async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
});

// PUT: Do'kon ma'lumotlarini yangilash
export const updateStore = createAsyncThunk('store/updateStore', async ({ id, storeData }) => {
    // storeData dan kalitlarni o'zgaritiramiz
    for (let pair of storeData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
    }
    const response = await axios.put(`${API_URL}/${id}`, storeData, {
        headers: {
            token: getToken(), // Tokenni qo'shish
            'Content-Type': 'multipart/form-data', // Yuklangan fayl uchun Content-Type
        },
    });
    return response.data;
});

// Slice yaratish
const storeSlice = createSlice({
    name: 'store',
    initialState: {
        stores: [],
        currentStore: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStores.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchStores.fulfilled, (state, action) => {
                state.loading = false;
                state.stores = action.payload;
            })
            .addCase(fetchStores.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchStoreById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchStoreById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentStore = action.payload;
            })
            .addCase(fetchStoreById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateStore.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateStore.fulfilled, (state, action) => {
                state.loading = false;
                const updatedStore = action.payload;
                state.stores = state.stores.map((store) =>
                    store._id === updatedStore._id ? updatedStore : store
                );
            })
            .addCase(updateStore.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default storeSlice.reducer;
