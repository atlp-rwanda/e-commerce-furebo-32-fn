// singleProductSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../utils/constants/config';


export interface Product {
  message:string,
  product:any
}

export interface SingleProductState {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

export const fetchSingleProduct = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>('product/fetchSingleProduct', async (productId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${BASE_API_URL}api/viewProduct/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to fetch product',
    );
  }
});

const initialState: SingleProductState = {
  product: null,
  loading: false,
  error: null,
};

const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSingleProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          state.product = action.payload;
        },
      )
      .addCase(
        fetchSingleProduct.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || 'Failed to fetch product';
        },
      );
  },
});

export default singleProductSlice.reducer;
