import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  access_token: string | null;
  name: string | null;
  email: string | null;
  phone?: string | null;
  role?: string | null;
  schoolId?: string | null;
}

export const authInitialState: AuthState = {
  access_token: null,
  name: null,
  email: null,
  phone: null,
  role: null,
  schoolId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => ({
      ...state,
      ...action.payload,
    }),
    logout: () => authInitialState,
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
