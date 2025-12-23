import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  user: any | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        token: string;
        user: any;
      }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },

   updateUser: (state, action: PayloadAction<Partial<any>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    logout: state => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { login ,updateUser,logout } = authSlice.actions;
export default authSlice.reducer;
