// src/app/dashboard/layout.tsx
import { ReactNode } from 'react';
import BubbleBackground from '@/components/BubbleBackground';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen">
            {/* ——— Fundo de bolinhas fixo ——— */}
            <BubbleBackground count={200} />

            {children}
        </div>
    );
}
