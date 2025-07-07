import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IArticle } from "@/helper/article";


interface IArticleState {
  list: IArticle[];
}

const initialState: IArticleState = {
  list: [],
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<IArticle[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setArticles } = articleSlice.actions;
export default articleSlice.reducer;
