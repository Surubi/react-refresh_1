import { createSlice } from "@reduxjs/toolkit";

export const menuVisibilitySlice = createSlice({
    name: 'toggleMenue',
    initialState: { toggle: true },
    reducers: {
        toggleExpand: (state, action)=>{
            state.toggle = action.payload.toggle;
        }
    },
});
export const { toggleExpand } = menuVisibilitySlice.actions;



