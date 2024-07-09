'use client'
import { AppStore, makeStore } from '@/lib/store'
import { useEffect, useRef, useState } from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

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
    useEffect(() => {
        const persistor = persistStore(storeRef.current!);
        persistor.persist();
        setIsHydrated(true);
    }, []);

    if (!isHydrated) {
        return <div>Loading...</div>; // Or any loading indicator
    }

    return (
        <Provider store={storeRef.current}>
            <PersistGate persistor={persistStore(storeRef.current)}>
                {children}
            </PersistGate>
        </Provider>
    );
};