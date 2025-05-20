// src/store/slices/agentAiSlice.ts
import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { logout as logoutAction } from './authSlice'

export type ChatMessage = {
    role: 'user' | 'assistant'
    content: string
}

export type ChatSession = {
    id: string
    title: string
    messages: ChatMessage[]
    createdAt: string  // ISO
}

export interface AgentAiState {
    sessions: ChatSession[]
    currentSessionIndex: number
}

const initialState: AgentAiState = {
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

const agentAiSlice = createSlice({
    name: 'agentAi',
    initialState,
    reducers: {
        newSession(state) {
            state.sessions.push({
                id: nanoid(),
                title: 'Novo chat',
                messages: [],
                createdAt: new Date().toISOString(),
            })
            state.currentSessionIndex = state.sessions.length - 1
        },
        deleteSession(state, action: PayloadAction<{ id: string }>) {
            const idx = state.sessions.findIndex(s => s.id === action.payload.id)
            if (idx !== -1) {
                state.sessions.splice(idx, 1)
                if (state.currentSessionIndex === idx) {
                    state.currentSessionIndex = Math.max(0, idx - 1)
                } else if (state.currentSessionIndex > idx) {
                    state.currentSessionIndex--
                }
            }
        },
        renameSession(state, action: PayloadAction<{ id: string; title: string }>) {
            const sess = state.sessions.find(s => s.id === action.payload.id)
            if (sess) sess.title = action.payload.title
        },
        selectSession(state, action: PayloadAction<{ index: number }>) {
            state.currentSessionIndex = action.payload.index
        },
        addUserMessage(
            state,
            action: PayloadAction<{ sessionId: string; content: string }>
        ) {
            const sess = state.sessions.find(
                s => s.id === action.payload.sessionId
            )
            sess?.messages.push({ role: 'user', content: action.payload.content })
        },
        addAssistantMessage(
            state,
            action: PayloadAction<{ sessionId: string; content: string }>
        ) {
            const sess = state.sessions.find(
                s => s.id === action.payload.sessionId
            )
            sess?.messages.push({
                role: 'assistant',
                content: action.payload.content,
            })
        },
    },
    extraReducers: builder => {
        // limpa todo o histórico ao fazer logout
        builder.addCase(logoutAction, () => ({
            sessions: [
                {
                    id: nanoid(),
                    title: 'Novo chat',
                    messages: [],
                    createdAt: new Date().toISOString(),
                },
            ],
            currentSessionIndex: 0,
        }))
    },
})

export const {
    newSession,
    deleteSession,
    renameSession,
    selectSession,
    addUserMessage,
    addAssistantMessage,
} = agentAiSlice.actions

export default agentAiSlice.reducer
