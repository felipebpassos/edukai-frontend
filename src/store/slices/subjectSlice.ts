// src/store/slices/subjectSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Subject } from '@/types/subject'
import type { RootState } from '../index'

interface SubjectState {
    list: Subject[]
}

const initialState: SubjectState = {
    list: [],
}

const subjectSlice = createSlice({
    name: 'subjects',
    initialState,
    reducers: {
        setSubjects(state, action: PayloadAction<Subject[]>) {
            state.list = action.payload
        },
        addSubject(state, action: PayloadAction<Subject>) {
            state.list.push(action.payload)
        },
        updateSubject(state, action: PayloadAction<Subject>) {
            const idx = state.list.findIndex(s => s.id === action.payload.id)
            if (idx !== -1) state.list[idx] = action.payload
        },
        removeSubject(state, action: PayloadAction<string>) {
            state.list = state.list.filter(s => s.id !== action.payload)
        },
        clearSubjects(state) {
            state.list = []
        },
    },
})

export const {
    setSubjects,
    addSubject,
    updateSubject,
    removeSubject,
    clearSubjects,
} = subjectSlice.actions

export const selectSubjects = (state: RootState) => state.subjects.list

export default subjectSlice.reducer
