import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InternetState = {
  isConnected: boolean;
};

const initialState: InternetState = {
  isConnected: true,
};

const internetSlice = createSlice({
  name: 'internet',
  initialState,
  reducers: {
    setInternetStatus(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
  },
});

export const { setInternetStatus } = internetSlice.actions;
export default internetSlice.reducer;
