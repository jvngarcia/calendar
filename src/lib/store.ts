import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Language, translations } from './i18n';

export interface CalendarEvent {
    id: string;
    title: string;
    day: number; // 0-6
    startHour: number; // decimal hour, e.g., 10.5 for 10:30
    endHour: number;
    color: string;
}

interface CalendarState {
    lang: Language;
    startHour: number;
    endHour: number;
    events: CalendarEvent[];
    setLang: (lang: Language) => void;
    setStartHour: (hour: number) => void;
    setEndHour: (hour: number) => void;
    addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
    updateEvent: (id: string, event: Partial<CalendarEvent>) => void;
    deleteEvent: (id: string) => void;
    clearEvents: () => void;
    _hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
}

export const useCalendarStore = create<CalendarState>()(
    persist(
        (set) => ({
            lang: 'ES',
            startHour: 0,
            endHour: 24,
            events: [], // Start with empty, hydration will fill it or we can set defaults if needed
            setLang: (lang) => {
                set({ lang });
                window.dispatchEvent(new CustomEvent('calendar-lang-change', { detail: lang }));
            },
            setStartHour: (hour) => set({ startHour: hour }),
            setEndHour: (hour) => set({ endHour: hour }),
            addEvent: (event) => set((state) => ({
                events: [...state.events, { ...event, id: Math.random().toString(36).substr(2, 9) }]
            })),
            updateEvent: (id, updatedEvent) => set((state) => ({
                events: state.events.map(e => e.id === id ? { ...e, ...updatedEvent } : e)
            })),
            deleteEvent: (id) => set((state) => ({
                events: state.events.filter(e => e.id !== id)
            })),
            clearEvents: () => set({ events: [] }),
            _hasHydrated: false,
            setHasHydrated: (state) => set({ _hasHydrated: state }),
        }),
        {
            name: 'calendar-storage',
            onRehydrateStorage: (state) => {
                return () => state.setHasHydrated(true);
            },
        }
    )
);
