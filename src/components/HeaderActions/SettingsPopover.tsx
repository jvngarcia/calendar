import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { IconSettings, IconChevronDown } from '@tabler/icons-react';
import { useCalendarStore } from '../../lib/store';
import { translations } from '../../lib/i18n';

export default function SettingsPopover() {
    const lang = useCalendarStore(state => state.lang);
    const startHour = useCalendarStore(state => state.startHour);
    const endHour = useCalendarStore(state => state.endHour);
    const setStartHour = useCalendarStore(state => state.setStartHour);
    const setEndHour = useCalendarStore(state => state.setEndHour);
    const t = translations[lang];

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <button className="flex cursor-pointer items-center justify-center size-10 rounded-lg bg-[#f1f3f3] dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-95" aria-label={t.settings}>
                    <IconSettings stroke={1.25} />
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content
                    className="bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 z-50 w-72 animate-in fade-in zoom-in-95 duration-200"
                    sideOffset={12}
                    align="end"
                >
                    <div className="space-y-5">
                        <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
                            <IconSettings className="size-4 opacity-50" />
                            {t.settings}
                        </h3>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t.startHourLabel}</label>
                                <div className="relative">
                                    <select
                                        className="w-full h-10 px-3 pr-10 rounded-xl border border-gray-100 dark:border-gray-700 bg-[#f9fafb] dark:bg-gray-800/50 text-sm tabular-nums outline-none appearance-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-white"
                                        value={startHour}
                                        onChange={(e) => setStartHour(parseInt(e.target.value))}
                                    >
                                        {Array.from({ length: 24 }, (_, i) => (
                                            <option key={i} value={i}>{i}:00</option>
                                        ))}
                                    </select>
                                    <IconChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t.endHourLabel}</label>
                                <div className="relative">
                                    <select
                                        className="w-full h-10 px-3 pr-10 rounded-xl border border-gray-100 dark:border-gray-700 bg-[#f9fafb] dark:bg-gray-800/50 text-sm tabular-nums outline-none appearance-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-white"
                                        value={endHour}
                                        onChange={(e) => setEndHour(parseInt(e.target.value))}
                                    >
                                        {Array.from({ length: 25 }, (_, i) => (
                                            <option key={i} value={i} disabled={i <= startHour}>{i}:00</option>
                                        ))}
                                    </select>
                                    <IconChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Popover.Arrow className="fill-white dark:fill-surface-dark" />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}
