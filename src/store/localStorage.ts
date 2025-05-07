import type { AuthState } from './slices/authSlice'
import { authInitialState } from './slices/authSlice'

const STORAGE_KEY = 'auth'

export function loadAuthFromStorage(): AuthState {
    if (typeof window === 'undefined') return authInitialState
    try {
        const str = window.localStorage.getItem(STORAGE_KEY)
        if (!str) return authInitialState
        return JSON.parse(str)
    } catch {
        return authInitialState
    }
}

export function saveAuthToStorage(state: AuthState): void {
    if (typeof window === 'undefined') return
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
        // falhou ao salvar, ignora
    }
}
