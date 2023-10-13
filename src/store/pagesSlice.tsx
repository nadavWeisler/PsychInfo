"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContentState } from "@/app/general/interfaces";

export const pagesSlice = createSlice({
    name: "pages",
    initialState: {
        content: []
    } as ContentState,
    reducers: {
        UploadContent(state, action: PayloadAction<ContentState>) {
            state.content = action.payload.content;
        }
    },
});

export const pagesActions = pagesSlice.actions;
