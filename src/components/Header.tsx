import React from 'react';
import { IconCalendarEvent } from '@tabler/icons-react';
import { useCalendarStore } from '../lib/store';
import { translations } from '../lib/i18n';

import LanguageSwitcher from './HeaderActions/LanguageSwitcher';
import ClearAllButton from './HeaderActions/ClearAllButton';
import DownloadPdfButton from './HeaderActions/DownloadPdfButton';
import SettingsPopover from './HeaderActions/SettingsPopover';
import TwitterLink from './HeaderActions/TwitterLink';

export default function Header() {
    const lang = useCalendarStore(state => state.lang);
    const t = translations[lang];

    return (
        <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-[#f1f3f3] dark:border-gray-800 shadow-sm print:static print:border-none print:bg-white text-pretty">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 select-none">
                        <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 text-primary print:border print:border-primary/20">
                            <IconCalendarEvent stroke={1.25} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white print:text-black">
                                {t.title}
                            </h1>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium print:text-gray-600">
                                {t.subtitle}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 md:gap-4 justify-center md:justify-end w-full md:w-auto no-print">
                        <div className="flex items-center gap-2">
                            <TwitterLink />
                            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>
                            <LanguageSwitcher />
                        </div>
                        <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>
                        <div className="flex items-center gap-2">
                            <ClearAllButton />
                            <DownloadPdfButton />
                            <SettingsPopover />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
