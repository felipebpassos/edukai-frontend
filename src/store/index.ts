// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer, type RootState } from './rootReducer'
import {
    loadAuthFromStorage,
    saveAuthToStorage,
} from './localStorage'

const isClient = typeof window !== 'undefined'

const preloadedState: Partial<RootState> = {
    // só chamo loadAuthFromStorage() no client
    auth: isClient ? loadAuthFromStorage() : undefined,
}

export const store = configureStore({
    reducer: rootReducer,
    preloadedState,
})

// só inscrevo o saveAuthToStorage no client
if (isClient) {
    store.subscribe(() => {
        saveAuthToStorage(store.getState().auth)
    })
}

export type AppDispatch = typeof store.dispatch
export type { RootState }
