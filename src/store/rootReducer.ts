// src/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit'
import auth from './slices/authSlice'
import agentAi from './slices/agentAiSlice'
import subjects from './slices/subjectSlice'

export const rootReducer = combineReducers({
    auth,
    agentAi,
    subjects,
})

export type RootState = ReturnType<typeof rootReducer>
