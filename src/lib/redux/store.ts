import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    accountReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
