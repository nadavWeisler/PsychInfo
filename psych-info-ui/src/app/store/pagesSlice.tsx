"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    Organization,
    PagesSliceInitialState,
    Tag,
    Language,
} from "@/app/General/interfaces";

export const pagesSlice = createSlice({
    name: "pagesSlice",
    initialState: {
        tags: [] as Tag[],
        organization: [] as Organization[],
        languages: [] as Language[],
    },

    reducers: {
        addData(state, action: PayloadAction<PagesSliceInitialState>) {
            state.tags = action.payload.tags;
            state.organization = action.payload.organization;
            state.languages = action.payload.languages;
        },
    },
});

export const pagesActions = pagesSlice.actions;
