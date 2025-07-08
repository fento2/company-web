import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAccountState {
  objectId: string;
  username: string;
  firstName: string;
  lastName: string;
  isLogin: boolean;
}

const initialState: IAccountState = {
  objectId: "",
  username: "",
  firstName: "",
  lastName: "",
  isLogin: false,
  
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IAccountState>) => { //dikasi payload biar aman type data IAccountState
      state.objectId = action.payload.objectId;
      state.username = action.payload.username;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.isLogin = action.payload.isLogin;
      
    },
    logout: (state) => {
      state.objectId = "";
      state.username = "";
      state.firstName = "";
      state.lastName = "";
      state.isLogin = false;
    },
  },
});

export const { login, logout } = accountSlice.actions;
export default accountSlice.reducer;
