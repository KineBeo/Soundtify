import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { authApi } from './features/auth/authApi'
import authReducer from './features/auth/authSlice'
import sessionStorage from 'redux-persist/es/storage/session'

const persistCongfig = {
    key: 'root',
    storage: sessionStorage,
    version: 1,
}

const persistedAuthReducer = persistReducer(persistCongfig, authReducer);

export const makeStore = () => {
    const store = configureStore({
        reducer: {
            auth: persistedAuthReducer,
            [authApi.reducerPath]: authApi.reducer,
        },

        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
                },
            }
            ).concat(authApi.middleware),
    });

    return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];