"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const isStateSlice = createSlice({
    name: "isState",
    initialState: {
        isDelete: false,
    },
    reducers: {
        setIsDelete(state) {
            state.isDelete = !state.isDelete;
        },
    },
});

export const isStateActions = isStateSlice.actions;
