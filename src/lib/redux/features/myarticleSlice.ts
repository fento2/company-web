import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IArticle } from "@/helper/article";


interface IArticleState {
  list: IArticle[];
}

const initialState: IArticleState = {
  list: [],
};

const myArticleSlice = createSlice({
  name: "myArticle",
  initialState,
  reducers: {
    setMyArticles: (state, action: PayloadAction<IArticle[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setMyArticles } = myArticleSlice.actions;
export default myArticleSlice.reducer;
