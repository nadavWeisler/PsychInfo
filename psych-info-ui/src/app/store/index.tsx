"use client";
import { configureStore } from "@reduxjs/toolkit";
import { pagesSlice } from "@/app/store/pagesSlice";

const store = configureStore({
    reducer: {
        pages: pagesSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
