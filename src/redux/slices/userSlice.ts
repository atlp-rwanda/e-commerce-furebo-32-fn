import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../utils/constants/config';

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
      const response = await axios.post(
      `${BASE_API_URL}/api/users/signup`,
        formDataToSend,
      );
      
      
      await axios.get(
        `${BASE_API_URL}/api/users/verify-email?token=${response.data.token}`,
      );
      
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
