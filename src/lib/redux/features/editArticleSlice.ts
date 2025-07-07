import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IArticle } from "@/helper/article";

interface EditArticleState extends IArticle {
  isEditing: boolean;
}

const initialState: EditArticleState = {
  objectId: "",
  title: "",
  thumbnail: "",
  content: "",
  category: "",
  author: "",
  published: true,
  isEditing: false,
  created:"",
};


const editArticleSlice = createSlice({
  name: "editArticle",
  initialState,
  reducers: {
    setEditArticle: (state, action: PayloadAction<EditArticleState>) => { 
      return {
        ...action.payload,
      };
    },


    // action kedua:  isEditing
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },


    clearEditArticle: () => initialState,
  },
});

export const { setEditArticle, setIsEditing, clearEditArticle } = editArticleSlice.actions;
export default editArticleSlice.reducer;

