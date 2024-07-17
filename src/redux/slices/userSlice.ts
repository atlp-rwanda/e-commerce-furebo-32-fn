import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  error: string | null;
  signupSuccess: boolean;
  submittedEmail: string;
  loading: boolean;
}

const initialState: UserState = {
  error: null,
  signupSuccess: false,
  submittedEmail: '',
  loading: false,
};

export const signupUser = createAsyncThunk(
  'user/signupUser',
  async (formData: any, { rejectWithValue }) => {
    try {
      const { rePassword, ...formDataToSend } = formData;
      const response = await axios.post('https://e-commerce-furebo-32-bn-1.onrender.com/api/users/signup', formDataToSend);
      
      
      await axios.get(`https://e-commerce-furebo-32-bn-1.onrender.com/api/users/verify-email?token=${response.data.token}`);
      
      return { email: formDataToSend.email, data: response.data };
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.signupSuccess = false;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.signupSuccess = true;
        state.submittedEmail = action.payload.email;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
