'use client'
import Loading from '@/components/Loading'
import { AppStore, makeStore } from '@/lib/store'
import { useRef, useState } from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { NextUIProvider } from '@nextui-org/react'
export default function StoreProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [isHydrated, setIsHydrated] = useState(false);
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        storeRef.current = makeStore()
    }

    const persistor = persistStore(storeRef.current!);
    persistor.persist();

    return (
        <NextUIProvider>
            <Provider store={storeRef.current}>
                <PersistGate loading={<Loading />} persistor={persistStore(storeRef.current)}>
                    {children}
                </PersistGate>
            </Provider>
        </NextUIProvider>
    );
};