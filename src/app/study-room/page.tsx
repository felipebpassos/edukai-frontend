// src/app/study-room/page.tsx
export const dynamic = 'force-dynamic'

import ClientStudyRoom from './ClientStudyRoom'

export default function StudyRoomPage() {

    return (
        <div className="min-h-screen flex items-center justify-center">
            <ClientStudyRoom />
        </div>
    );
}