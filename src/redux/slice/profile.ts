import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type ProfileState = {
  activeProfileId: string | null;
  isRegistered: boolean;
};

const initialState: ProfileState = {
  activeProfileId: null,
  isRegistered: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setActiveProfile(state, action: PayloadAction<string>) {
      state.activeProfileId = action.payload;
    },
    setIsRegister(state, action: PayloadAction<boolean>) {
      state.isRegistered = action.payload;
    },
    clearProfile(state) {
      state.activeProfileId = null;
      state.isRegistered = false;
    },
  },
});

export const { setActiveProfile, clearProfile, setIsRegister } = profileSlice.actions;
export default profileSlice.reducer;
