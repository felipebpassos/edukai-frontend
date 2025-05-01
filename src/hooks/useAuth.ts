// src/hooks/useAuth.ts
import { useCallback } from 'react';
import { authenticateUser } from '@/api/auth';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCredentials, logout as logoutAction } from '@/store/slices/authSlice';

export function useAuth() {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);

    const login = useCallback(async (email: string, password: string) => {
        const data = await authenticateUser({ email, password });
        dispatch(setCredentials(data));
        return data;
    }, [dispatch]);

    const logout = useCallback(() => {
        dispatch(logoutAction());
    }, [dispatch]);

    return { auth, login, logout };
}
