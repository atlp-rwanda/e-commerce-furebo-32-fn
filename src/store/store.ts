import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import baseAPI from "./api"; // Import your baseAPI

const store = configureStore({
  reducer: {
    ...rootReducer,
    [baseAPI.reducerPath]: baseAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
