import React from 'react';
import { IconBrandX } from '@tabler/icons-react';
import { useCalendarStore } from '../../lib/store';
import { translations } from '../../lib/i18n';

export default function TwitterLink() {
    const lang = useCalendarStore(state => state.lang);
    const followMe = lang === 'ES' ? 'Sígueme en X' : 'Follow me on X';

    return (
        <a
            href="https://x.com/jvngarcia_"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center size-10 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            title={followMe}
            aria-label={followMe}
        >
            <IconBrandX stroke={1.25} size={20} />
        </a>
    );
}
