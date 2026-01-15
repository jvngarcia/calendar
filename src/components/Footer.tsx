import React from 'react';
import { IconHeart } from '@tabler/icons-react';
import { useCalendarStore } from '../lib/store';

export default function Footer() {
    const lang = useCalendarStore(state => state.lang);

    return (
        <footer className="w-full py-8 text-center text-sm text-gray-500 dark:text-gray-400 no-print">
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
                <span>{lang === 'ES' ? 'Hecho con' : 'Made with'}</span>
                <IconHeart className="size-4 text-red-500 fill-red-500 animate-pulse" stroke={1.5} />
                <span>{lang === 'ES' ? 'por' : 'by'}</span>
                <a
                    href="https://holasoy.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-gray-900 dark:text-white hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4"
                >
                    holasoy.dev
                </a>
            </div>
        </footer>
    );
}
