import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { authApi } from './features/auth/authApi'
import authReducer from './features/auth/authSlice'
import sessionStorage from 'redux-persist/es/storage/session'
import { trackApi } from './features/track/trackApi'
import { artistApi } from './features/artist/artistApi'
import homePageReducer from './features/homePage/homePageSlice'
const persistCongfig = {
    key: 'root',
    storage: sessionStorage,
    version: 1,
}

const appReducer = combineReducers({
    homepage: homePageReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [trackApi.reducerPath]: trackApi.reducer,
    [artistApi.reducerPath]: artistApi.reducer
});

const persistedReducer = persistReducer(persistCongfig, appReducer);

export const makeStore = () => {
    const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }
            ).concat(authApi.middleware)
                .concat(artistApi.middleware)
                .concat(trackApi.middleware),
    });

    return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];