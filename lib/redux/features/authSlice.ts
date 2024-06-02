import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.isAuthenticated = false;
    },

    finishInitialLoad: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, logout, finishInitialLoad } = authSlice.actions;
export default authSlice.reducer;
