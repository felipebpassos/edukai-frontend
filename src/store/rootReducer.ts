// src/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit'
import auth from './slices/authSlice'
import agentAi from './slices/agentAiSlice'

export const rootReducer = combineReducers({
    auth,
    agentAi,
})

export type RootState = ReturnType<typeof rootReducer>
