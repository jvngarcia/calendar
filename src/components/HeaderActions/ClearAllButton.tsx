import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { IconTrash } from '@tabler/icons-react';
import { useCalendarStore } from '../../lib/store';
import { translations } from '../../lib/i18n';

export default function ClearAllButton() {
    const lang = useCalendarStore(state => state.lang);
    const clearEvents = useCalendarStore(state => state.clearEvents);
    const t = translations[lang];

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <button
                    className="flex cursor-pointer items-center justify-center h-10 px-4 rounded-lg text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors gap-2 group"
                >
                    <IconTrash stroke={1.25} />
                    <span className="hidden sm:inline">{t.clearAll}</span>
                </button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
                <AlertDialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-sm bg-white dark:bg-surface-dark rounded-2xl shadow-2xl p-6 z-50 animate-in zoom-in-95 fade-in duration-200 border border-gray-100 dark:border-gray-800">
                    <AlertDialog.Title className="text-xl font-bold text-gray-900 dark:text-white text-pretty mb-2">
                        {t.clearAllTitle}
                    </AlertDialog.Title>
                    <AlertDialog.Description className="text-gray-500 dark:text-gray-400 text-sm mb-6 text-pretty">
                        {t.clearAllDescription}
                    </AlertDialog.Description>
                    <div className="flex gap-3">
                        <AlertDialog.Cancel asChild>
                            <button className="flex-1 h-11 rounded-xl font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                {t.cancel}
                            </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                            <button
                                onClick={() => clearEvents()}
                                className="flex-1 h-11 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg shadow-red-500/20 transition-all active:scale-95"
                            >
                                {t.clearAll}
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}
