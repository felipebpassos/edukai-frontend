import { configureStore } from '@reduxjs/toolkit'
import { rootReducer, type RootState } from './rootReducer'
import {
    loadAuthFromStorage,
    saveAuthToStorage,
} from './localStorage'

const isClient = typeof window !== 'undefined'

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
        auth: isClient ? loadAuthFromStorage() : undefined,
    },
})

if (isClient) {
    store.subscribe(() => {
        saveAuthToStorage(store.getState().auth)
    })
}

export type AppDispatch = typeof store.dispatch
export type { RootState }
