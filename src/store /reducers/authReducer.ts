import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/auth.type";

type AuthState = {
  user: User | null;
  token: string | null;
};

const STORAGE_KEY = "jobboard_auth";

const load = (): AuthState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { user: null, token: null };
  } catch {
    return { user: null, token: null };
  }
};

const save = (s: AuthState) => localStorage.setItem(STORAGE_KEY, JSON.stringify(s));

const initialState: AuthState = load();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<AuthState>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      save({ user: state.user, token: state.token });
    },
    clearSession(state) {
      state.user = null;
      state.token = null;
      save({ user: null, token: null });
    },
  },
});

export const { setSession, clearSession } = authSlice.actions;
export default authSlice.reducer;
