import { createSlice } from "@reduxjs/toolkit";

export interface UserAuthState {
    isAuthenticated: boolean | false;
    userName: string | null;
}

export const userAuthStore = createSlice({
    name: 'userAuth',
    initialState : { isAuthenticated: false, userName: null } as UserAuthState,
    reducers: {
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.userName = action.payload.userName;
        },
        clearAuthenticated: (state) => {
            state.isAuthenticated = false;
            state.userName = null;
        }   
    }
});

export const { setAuthenticated, clearAuthenticated } = userAuthStore.actions;