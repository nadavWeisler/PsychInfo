"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PagesSliceInitialState } from "@/app/General/interfaces";

export const pagesSlice = createSlice({
    name: "pagesSlice",
    initialState: {
        tags: [] as string[],
        organization: [] as string[],
    },

    reducers: {
        addData(state, action: PayloadAction<PagesSliceInitialState>) {
            state.tags = action.payload.tags;
            state.organization = action.payload.organization;
        },
    },
});

export const pagesActions = pagesSlice.actions;
