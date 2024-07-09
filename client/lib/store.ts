import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { authApi } from './features/auth/authApi'
import authReducer from './features/auth/authSlice'
import { trackApi } from './features/track/trackApi'
import { artistApi } from './features/artist/artistApi'
import homePageReducer from './features/homePage/homePageSlice'
import audioPlayerReducer from './features/audioPlayer/audioPlayerSlice'
import localStorage from 'redux-persist/es/storage'

const persistCongfig = {
    key: 'root',
    storage: localStorage,
}

const appReducer = combineReducers({
    homepage: homePageReducer,
    auth: authReducer,
    audioPlayer: audioPlayerReducer,
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
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
                },
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