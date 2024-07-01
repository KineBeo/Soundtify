import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";

export type LoginResponse = {
    accessToken: string,
    refreshToken: string,
    email: string;
    name: string;
}

const initialState: {
    accessToken: string | null;
    refreshToken: string | null;
    email: string | null;
    name: string | null;
} = {
    accessToken: null,
    refreshToken: null,
    email: null,
    name: null,
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
            // state.id = id;
            console.log('authSlice: login action dispatched', { accessToken, refreshToken, email, name });
        },

        logOut: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            // state.email = null;
            state.name = null;
        }
    }
});

export const { login, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentname = (state: RootState) => state.auth.name;
export const selectCurrentUserEmail = (state: RootState) => state.auth.email;
// export const selectCurrentUserId = (state: RootState) => state.auth.id;
export const selectIsLoggedIn = (state: RootState) => {
    const isLoggedIn = !!state.auth.accessToken;
    // console.log('selectIsLoggedIn called:', isLoggedIn, 'this is state.auth', state.auth);
    return isLoggedIn;
};
