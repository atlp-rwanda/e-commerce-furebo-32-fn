import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store/store';
import { toast } from 'react-toastify';
import { message as antdMessage } from 'antd';
interface User {
  id: number;
  name: string;
}

interface Message {
  id: string;
  userId: number;
  name: string;
  email: string;
  content: string;
  createdAt: string;
}

interface ChatState {
  messages: Message[];
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  users: [],
  loading: false,
  error: null,
};

// Fetch users from the API
export const fetchUsers = createAsyncThunk('chat/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('https://e-commerce-furebo-32-bn-1.onrender.com/api/users');
    return response.data;
  } catch (error: any) {
    toast.error('Failed to fetch users. Please try again later.');
    return rejectWithValue(error.response.data);
  }
});

// Fetch messages
export const fetchMessages = createAsyncThunk('chat/fetchMessages', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('https://e-commerce-furebo-32-bn-1.onrender.com/api/chats/messages');
    return response.data;
  } catch (error: any) {
    toast.error('Failed to fetch messages. Please try again later.');
    return rejectWithValue(error.response.data);
  }
});

// Send a message
export const sendMessage = createAsyncThunk('chat/sendMessage', async (message: { content: string; userId: number }, { getState, rejectWithValue }) => {
  const state = getState() as RootState;
  const token = state.user.token || localStorage.getItem('token');

  if (!token) {
    antdMessage.error('Please login to chat or send a message.');
    return rejectWithValue('No token found');
  }

  try {
    const response = await axios.post('https://e-commerce-furebo-32-bn-1.onrender.com/api/chats/sendmessages', message, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error: any) {
    toast.error('Failed to send message. Please try again later.');
    return rejectWithValue(error.response.data);
  }
});

export const deleteMessage = createAsyncThunk(
  'chat/deleteMessage',
  async (messageId: string, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = state.user.token || localStorage.getItem('token');

    if (!token) {
      antdMessage.error('Please login to delete a message.');
      return rejectWithValue('No token found');
    }

    try {
      await axios.delete(`https://e-commerce-furebo-32-bn-1.onrender.com/api/chats/messages/${messageId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      antdMessage.success('Message deleted successfully');
      return messageId;
    } catch (error: any) {
      antdMessage.error('Failed to delete message. Please try again later.');
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(message => message.id !== action.payload);
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default chatSlice.reducer;
