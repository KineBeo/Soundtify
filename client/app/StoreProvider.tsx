'use client'
import { AppStore, makeStore } from '@/lib/store'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        storeRef.current = makeStore()
    }
    const persistor = persistStore(storeRef.current);


    return (
        <Provider store={storeRef.current}>
            <PersistGate loading={<div> loading nigga</div>} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
};