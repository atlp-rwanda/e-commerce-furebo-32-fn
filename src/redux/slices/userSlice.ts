import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_API_URL } from '../../utils/constants/config';

interface User {
  id: string;
  email: string;
  role: string;
  permissions: string[];
  [key: string]: any;
}

interface UserState {
  token: any;
  id: number;
  users: User[];
  loading: boolean;
  error: string | null;
  signupSuccess: boolean;
  submittedEmail: string;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  signupSuccess: false,
  submittedEmail: '',
};

// Fetch Users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_API_URL}api/users/users`);
    return response.data.data.users;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
});

// Update User Role
export const updateUserRole = createAsyncThunk(
  'users/updateUserRole',
  async ({ userId, role }: { userId: string, role: string }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${BASE_API_URL}api/users/${userId}/role`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('User role updated successfully');
      return { userId, role }; 
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error('Error updating user role');
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        toast.error('An unknown error occurred');
        return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
  }
);

// Update User Permissions (Frontend Only)
export const updateUserPermissions = createAsyncThunk(
  'users/updateUserPermissions',
  async ({ userId, permissions }: { userId: string, permissions: string[] }, thunkAPI) => {
    // Simply return the payload; no actual API call
    return { userId, permissions };
  }
);

// Signup User
export const signupUser = createAsyncThunk('user/signupUser', async (formData: any, { rejectWithValue }) => {
  try {
    const { rePassword, ...formDataToSend } = formData;
    const response = await axios.post(`${BASE_API_URL}api/users/signup`, formDataToSend);
    await axios.get(`${BASE_API_URL}api/users/verify-email?token=${response.data.token}`);
    return { email: formDataToSend.email, data: response.data };
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update User Role
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.users = state.users.map(user =>
          user.id === action.payload.userId ? { ...user, role: action.payload.role } : user
        );
      })
      // Update User Permissions
      .addCase(updateUserPermissions.fulfilled, (state, action) => {
        state.users = state.users.map(user =>
          user.id === action.payload.userId ? { ...user, permissions: action.payload.permissions } : user
        );
      })
      // Signup User
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
