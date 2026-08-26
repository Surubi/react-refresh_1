import { configureStore } from "@reduxjs/toolkit";
import { menuVisibilitySlice } from "./menue-visiblity-ctrl.store";
import { userAuthStore } from "./user-auth-store";

export const appStore = configureStore({
    reducer: {
        toggleMenue: menuVisibilitySlice.reducer,
        userAuth: userAuthStore.reducer
    },
    devTools: true
});

export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch