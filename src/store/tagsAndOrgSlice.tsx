"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TagsAndOrgState } from "@/app/[lng]/general/interfaces";

export const tagsAndOrgSlice = createSlice({
  name: "tagsAndOrg",
  initialState: {
    tags: [],
    organizations: [],
  } as TagsAndOrgState,
  reducers: {
    getData(state, action: PayloadAction<TagsAndOrgState>) {
      state.tags = action.payload.tags;
      state.organizations = action.payload.organizations;
    },
  },
});

export const tagsAndOrgActions = tagsAndOrgSlice.actions;
