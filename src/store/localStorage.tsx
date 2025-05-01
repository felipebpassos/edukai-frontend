import type { AuthState } from './slices/authSlice'

export const loadAuthFromStorage = (): AuthState | undefined => {
    try {
        const serializedState = localStorage.getItem('auth')
        if (!serializedState) return undefined
        return JSON.parse(serializedState) as AuthState
    } catch {
        return undefined
    }
}

export const saveAuthToStorage = (state: AuthState): void => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('auth', serializedState)
    } catch {
    }
}
