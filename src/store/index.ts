// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer, type RootState } from './rootReducer'
import {
    loadAuthFromStorage,
    saveAuthToStorage,
    loadAgentAiFromStorage,
    saveAgentAiToStorage,
} from './localStorage'

const isClient = typeof window !== 'undefined'

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
        auth: isClient ? loadAuthFromStorage() : undefined,
        agentAi: isClient ? loadAgentAiFromStorage() : undefined,
    },
})

if (isClient) {
    store.subscribe(() => {
        const state = store.getState()
        saveAuthToStorage(state.auth)
        saveAgentAiToStorage(state.agentAi)
    })
}

export type AppDispatch = typeof store.dispatch
export type { RootState }
