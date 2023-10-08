"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PagesSliceInitialState } from "@/app/General/interfaces";

export const pagesSlice = createSlice({
    name: "pagesSlice",
    initialState: [
        {
            prop1: 0,
            prop2: 0,
            prop3: "",
            prop4: "",
        },
    ],
    reducers: {
        addData(state, action: PayloadAction<PagesSliceInitialState>) {
            state[action.payload.index] = action.payload;
        },
    },
});

export const pagesActions = pagesSlice.actions;
