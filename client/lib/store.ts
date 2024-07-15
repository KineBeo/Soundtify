import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { authApi } from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice";
// import { trackApi } from "./features/track/trackApi";
// import { artistApi } from "./features/artist/artistApi";
import homePageReducer from "./features/homePage/homePageSlice";
import audioPlayerReducer from "./features/audioPlayer/audioPlayerSlice";
import localStorage from "redux-persist/es/storage";
import { audioPlayerApi } from "./features/audioPlayer/audioPlayerApi";
import { artistApi } from "./features/artist/artistApi";
import { trackApi } from "./features/track/trackApi";

const persistCongfig = {
  key: "root",
  storage: localStorage,
  blacklist: [artistApi.reducerPath, trackApi.reducerPath],
};

const appReducer = combineReducers({
  homepage: homePageReducer,
  auth: authReducer,
  audioPlayer: audioPlayerReducer,
  [artistApi.reducerPath]: artistApi.reducer,
  [trackApi.reducerPath]: trackApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [audioPlayerApi.reducerPath]: audioPlayerApi.reducer,
});

const persistedReducer = persistReducer(persistCongfig, appReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
        .concat(artistApi.middleware)
        .concat(trackApi.middleware)
        .concat(authApi.middleware)
        .concat(audioPlayerApi.middleware),
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
