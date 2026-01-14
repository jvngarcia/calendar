import React from 'react';
import { useCalendarStore } from '../../lib/store';

export default function LanguageSwitcher() {
    const lang = useCalendarStore(state => state.lang);
    const setLang = useCalendarStore(state => state.setLang);

    return (
        <div className="flex h-10 items-center bg-[#f1f3f3] dark:bg-gray-800 p-1 rounded-lg">
            {['EN', 'ES'].map((l) => (
                <button
                    key={l}
                    onClick={() => setLang(l as any)}
                    className={`cursor-pointer px-3 h-full text-xs font-bold rounded-md transition-all ${lang === l
                        ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                        }`}
                >
                    {l}
                </button>
            ))}
        </div>
    );
}
