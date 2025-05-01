// /types/auth.ts
export interface LoginResponse {
    access_token: string;
    name: string;
    email: string;
    phone?: string | null;
    role: string;
    schoolId?: string | null;
}
