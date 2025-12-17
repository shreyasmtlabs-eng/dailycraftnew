import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MembershipState {
  isPremium: boolean;
}

const initialState: MembershipState = {
  isPremium: false,
};

const membershipSlice = createSlice({
  name: 'membership',
  initialState,
  reducers: {
    setPremiumStatus: (state, action: PayloadAction<boolean>) => {
      state.isPremium = action.payload;
    },
  },
});

export const { setPremiumStatus } = membershipSlice.actions;
export default membershipSlice.reducer;
