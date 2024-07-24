import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import baseAPI from "./api";
import userReducer from '../redux/slices/userSlice';
import chatReducer from '../redux/chatSlice'; 
const store = configureStore({
  reducer: {
    ...rootReducer,
    [baseAPI.reducerPath]: baseAPI.reducer,
    user: userReducer,
    chat: chatReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;


