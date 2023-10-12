"use client";
import { configureStore } from "@reduxjs/toolkit";
import { pagesSlice } from "@/store/pagesSlice";

const store = configureStore({
    reducer: {
        pages: pagesSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
