import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/userSlice";
import articleSlice from "./features/articleSlice";
import myArticleSlice from "./features/myarticleSlice";
import editArticleSlice from "./features/editArticleSlice"
export const store = configureStore({
  reducer: {
    accountReducer,
    articleSlice,
    myArticleSlice,
    editArticleSlice,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


