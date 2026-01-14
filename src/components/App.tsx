import React from 'react';
import Header from './Header';
import Calendar from './Calendar';

import { useCalendarStore } from '../lib/store';

export default function App() {
    const hasHydrated = useCalendarStore(state => state._hasHydrated);

    if (!hasHydrated) {
        return <div className="min-h-dvh flex items-center justify-center bg-[#fcfdfd] dark:bg-[#0c0e10]">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="size-12 rounded-xl bg-primary/20" />
                <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-800" />
            </div>
        </div>;
    }

    return (
        <div className="min-h-dvh flex flex-col bg-[#fcfdfd] dark:bg-[#0c0e10]">
            <Header />
            <main className="flex-grow w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0 print:max-w-none print:w-full relative">
                <Calendar />
            </main>
        </div>
    );
}
