// src/store/localStorage.ts

import type { AuthState } from './slices/authSlice'
import { authInitialState } from './slices/authSlice'

import type { AgentAiState } from './slices/agentAiSlice'
import { nanoid } from '@reduxjs/toolkit'

const AUTH_STORAGE_KEY = 'auth'
const AGENT_AI_STORAGE_KEY = 'agentAi'

export function loadAuthFromStorage(): AuthState {
    if (typeof window === 'undefined') return authInitialState
    try {
        const str = window.localStorage.getItem(AUTH_STORAGE_KEY)
        if (!str) return authInitialState
        return JSON.parse(str)
    } catch {
        return authInitialState
    }
}

export function saveAuthToStorage(state: AuthState): void {
    if (typeof window === 'undefined') return
    try {
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state))
    } catch {
        // falhou ao salvar, ignora
    }
}

export function loadAgentAiFromStorage(): AgentAiState {
    if (typeof window === 'undefined') return defaultAgentAiState()
    try {
        const str = window.localStorage.getItem(AGENT_AI_STORAGE_KEY)
        if (!str) return defaultAgentAiState()
        return JSON.parse(str)
    } catch {
        return defaultAgentAiState()
    }
}

export function saveAgentAiToStorage(state: AgentAiState): void {
    if (typeof window === 'undefined') return
    try {
        window.localStorage.setItem(AGENT_AI_STORAGE_KEY, JSON.stringify(state))
    } catch {
        // falhou ao salvar, ignora
    }
}

function defaultAgentAiState(): AgentAiState {
    return {
        sessions: [
            {
                id: nanoid(),
                title: 'Novo chat',
                messages: [],
                createdAt: new Date().toISOString(),
            },
        ],
        currentSessionIndex: 0,
    }
}
