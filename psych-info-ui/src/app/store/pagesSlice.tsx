"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Organization, PagesSliceInitialState, Tag } from "@/app/general/interfaces";

export const pagesSlice = createSlice({
    name: "pagesSlice",
    initialState: {
        tags: [] as Tag[],
        organization: [] as Organization[],
    },

    reducers: {
        addData(state, action: PayloadAction<PagesSliceInitialState>) {
            state.tags = action.payload.tags;
            state.organization = action.payload.organization;
        },
    },
});

export const pagesActions = pagesSlice.actions;
