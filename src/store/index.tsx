"use client";
import { configureStore } from "@reduxjs/toolkit";
import { pagesSlice } from "@/store/pagesSlice";
import { tagsAndOrgSlice } from "@/store/tagsAndOrgSlice";
import { isStateSlice } from "@/store/isStateSlice";

const store = configureStore({
  reducer: {
    pages: pagesSlice.reducer,
    tagsAndOrg: tagsAndOrgSlice.reducer,
    isState: isStateSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
