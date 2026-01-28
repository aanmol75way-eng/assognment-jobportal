import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "@/shared/authApi";
import { clearSession, setSession } from "../reducers/authReducer";
import type { LoginInput } from "@/types/auth.type";
import type { RootState } from "../store";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (input: LoginInput, { dispatch }) => {
    const res = await authApi.login(input);
    dispatch(setSession({ user: res.user, token: res.token }));
    return res;
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_: void, { dispatch, getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token as string | null;

    if (token) await authApi.logout(() => token);
    dispatch(clearSession());
  }
);

export const meThunk = createAsyncThunk(
  "auth/me",
  async (_: void, { dispatch, getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token as string | null;

    if (!token) {
      dispatch(clearSession());
      return null;
    }

    const res = await authApi.me(() => token);
    dispatch(setSession({ user: res.user, token }));
    return res;
  }
);
