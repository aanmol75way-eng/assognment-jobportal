// src/features/ui/store/ui.slice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UiState = {
  jobsSearch: string;
  location: string;
  remoteOnly: boolean;
};

const initialState: UiState = {
  jobsSearch: "",
  location: "",
  remoteOnly: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setJobsSearch(s, a: PayloadAction<string>) {
      s.jobsSearch = a.payload;
    },
    setLocation(s, a: PayloadAction<string>) {
      s.location = a.payload;
    },
    setRemoteOnly(s, a: PayloadAction<boolean>) {
      s.remoteOnly = a.payload;
    },
  },
});

export const { setJobsSearch, setLocation, setRemoteOnly } = uiSlice.actions;
export default uiSlice.reducer;
