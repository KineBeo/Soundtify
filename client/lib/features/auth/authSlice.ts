import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";

export type LoginResponse = {
    accessToken: string,
    refreshToken: string,
    email: string;
    name: string;
}

export type RegisterResponse = {
    email: string;
    name: string;
}

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    email: string | null;
    name: string | null;
    isLoggedIn: boolean;
    isRegistered: boolean;
}


const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    email: null,
    name: null,
    isLoggedIn: false,
    isRegistered: false,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginResponse>) => {
            const { accessToken, refreshToken, email, name } = action.payload;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.email = email;
            state.name = name;
            state.isLoggedIn = true;
            state.isRegistered = true;

        },

        register: (state, action: PayloadAction<RegisterResponse>) => {
            const { email, name } = action.payload;
            state.email = email;
            state.name = name;
            state.isRegistered = true;
        },

        logOut: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.isLoggedIn = false;
            state.isRegistered = false;
            state.name = null;
        }
    }
});

export const { login, register, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentname = (state: RootState) => state.auth.name;
export const selectCurrentUserEmail = (state: RootState) => state.auth.email;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsRegistered = (state: RootState) => state.auth.isRegistered;