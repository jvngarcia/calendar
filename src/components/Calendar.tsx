import React, { useState, useMemo } from 'react';
import { cn } from '../lib/utils';
import {
    IconPlus,
    IconTrash,
    IconX,
    IconClock,
    IconCalendar,
    IconCopy,
    IconEdit
} from '@tabler/icons-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { format, addHours, startOfDay } from 'date-fns';
import { translations } from '../lib/i18n';
import { useCalendarStore, type CalendarEvent } from '../lib/store';

const COLORS = [
    { name: 'Teal', bg: 'bg-teal-100/90 dark:bg-teal-900/60', border: 'border-teal-500', text: 'text-teal-800 dark:text-teal-100', dot: 'bg-teal-500' },
    { name: 'Lavender', bg: 'bg-violet-100/90 dark:bg-violet-900/60', border: 'border-violet-500', text: 'text-violet-800 dark:text-violet-100', dot: 'bg-violet-500' },
    { name: 'Peach', bg: 'bg-orange-100/90 dark:bg-orange-900/60', border: 'border-orange-500', text: 'text-orange-800 dark:text-orange-100', dot: 'bg-orange-500' },
    { name: 'Mint', bg: 'bg-emerald-100/90 dark:bg-emerald-900/60', border: 'border-emerald-500', text: 'text-emerald-800 dark:text-emerald-100', dot: 'bg-emerald-500' },
    { name: 'Sky', bg: 'bg-sky-100/90 dark:bg-sky-900/60', border: 'border-sky-500', text: 'text-sky-800 dark:text-sky-100', dot: 'bg-sky-500' },
];

const HOUR_HEIGHT = 56; // h-14 is 3.5rem = 56px

export default function Calendar() {
    const lang = useCalendarStore(state => state.lang);
    const startHour = useCalendarStore(state => state.startHour);
    const endHour = useCalendarStore(state => state.endHour);
    const events = useCalendarStore(state => state.events);
    const addEvent = useCalendarStore(state => state.addEvent);
    const updateEvent = useCalendarStore(state => state.updateEvent);
    const deleteEvent = useCalendarStore(state => state.deleteEvent);

    const t = translations[lang];

    const [eventToDelete, setEventToDelete] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const hoursRange = useMemo(() => {
        return Array.from({ length: endHour - startHour }, (_, i) => startHour + i);
    }, [startHour, endHour]);

    const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
        title: '',
        day: 0,
        startHour: 9,
        endHour: 10,
        color: 'Teal'
    });

    const handleAddEvent = () => {
        if (newEvent.title && newEvent.startHour !== undefined && newEvent.endHour !== undefined) {
            if (newEvent.id) {
                const { id, ...eventDetails } = newEvent;
                updateEvent(id, eventDetails);
            } else {
                addEvent(newEvent as Omit<CalendarEvent, 'id'>);
            }
            setIsDialogOpen(false);
            setNewEvent({ title: '', day: 0, startHour: 9, endHour: 10, color: 'Teal' });
        }
    };

    const handleDeleteConfirm = (id: string) => {
        deleteEvent(id);
        setEventToDelete(null);
    };

    const handleCopyEvent = (event: CalendarEvent) => {
        const { id, ...eventCopy } = event;
        setNewEvent(eventCopy);
        setIsDialogOpen(true);
    };

    const handleEditEvent = (event: CalendarEvent) => {
        setNewEvent(event);
        setIsDialogOpen(true);
    };


    return (
        <div id="calendar-to-export" className="bg-white dark:bg-surface-dark rounded-2xl shadow-soft border border-transparent dark:border-gray-800 overflow-hidden ring-1 ring-gray-200/50 dark:ring-gray-700/50">
            <div className="overflow-x-auto w-full relative">
                <div className="min-w-[900px] relative">
                    {/* Table Structure */}
                    <table className="w-full border-collapse table-fixed relative z-10">
                        <thead>
                            <tr>
                                <th className="w-16 h-12 bg-gray-50 dark:bg-[#1f2226] border-b border-r border-gray-100 dark:border-gray-800 p-3 text-xs font-bold text-gray-400 uppercase tracking-wider text-center sticky left-0 z-20 print:bg-gray-50 print:text-black">
                                    {t.hour}
                                </th>
                                {t.days.map((day, i) => (
                                    <th
                                        key={i}
                                        className={cn(
                                            "bg-gray-50/50 dark:bg-[#1f2226]/50 border-b border-r border-gray-100 dark:border-gray-800 p-3 text-sm font-bold text-gray-700 dark:text-gray-200 text-center w-[13%] print:bg-white print:text-black",
                                            (i >= 5) && "bg-teal-50/30 dark:bg-teal-900/10 text-primary"
                                        )}
                                    >
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {hoursRange.map((hour: number) => (
                                <tr key={hour} className="group">
                                    <td className="bg-gray-50/80 dark:bg-[#1f2226] border-r border-gray-100 dark:border-gray-800 p-2 text-xs font-semibold text-gray-500 text-center sticky left-0 z-10 print:bg-white print:text-black h-14 tabular-nums">
                                        {hour}:00
                                    </td>
                                    {t.days.map((_, i) => (
                                        <td
                                            key={i}
                                            className={cn(
                                                "relative p-0 h-14 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer",
                                                i < 6 && "border-r border-gray-100 dark:border-gray-800",
                                                i >= 5 && "bg-gray-50/30 dark:bg-gray-800/20"
                                            )}
                                            onClick={() => {
                                                setNewEvent(prev => ({ ...prev, day: i, startHour: hour, endHour: hour + 1 }));
                                                setIsDialogOpen(true);
                                            }}
                                        >
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center pointer-events-none">
                                                <IconPlus className="size-4 text-primary/40" />
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Events Overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none z-30"
                        style={{ top: '48px', left: '120px', width: 'calc(100% - 118px)', height: 'calc(100% - 48px)' }}
                    >
                        {events.map((event) => {
                            if (event.startHour < startHour || event.endHour > endHour) return null;

                            const colorConfig = COLORS.find(c => c.name === event.color) || COLORS[0];
                            const top = (event.startHour - startHour) * HOUR_HEIGHT;
                            const height = (event.endHour - event.startHour) * HOUR_HEIGHT;
                            const width = 100 / 7;
                            const left = event.day * width;

                            return (
                                <div
                                    key={event.id}
                                    onClick={(e) => { e.stopPropagation(); handleEditEvent(event); }}
                                    className={cn(
                                        "absolute pointer-events-auto border-l-4 shadow-sm rounded-r-md rounded-bl-sm flex flex-col p-2 backdrop-blur-[2px] transition-all group cursor-pointer",
                                        colorConfig.bg,
                                        colorConfig.border
                                    )}
                                    style={{
                                        top: `${top}px`,
                                        left: `calc(${left}% + 1px)`,
                                        width: `calc(${width}% - 1px)`,
                                        height: `${height}px`,
                                        padding: '4px',
                                    }}
                                >
                                    <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleEditEvent(event); }}
                                            className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-white/60 dark:hover:bg-black/30 transition-colors"
                                            aria-label={t.edit}
                                        >
                                            <IconEdit className="size-3.5" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleCopyEvent(event); }}
                                            className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-white/60 dark:hover:bg-black/30 transition-colors"
                                            aria-label={t.copy}
                                        >
                                            <IconCopy className="size-3.5" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setEventToDelete(event.id); }}
                                            className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-white/60 dark:hover:bg-black/30 transition-colors text-red-500 hover:text-red-600"
                                            aria-label={t.deleteAction}
                                        >
                                            <IconTrash className="size-3.5" />
                                        </button>
                                    </div>
                                    <span className={cn("font-bold text-xs sm:text-sm leading-tight text-pretty", colorConfig.text)}>
                                        {event.title}
                                    </span>
                                    <span className={cn("text-[10px] font-medium mt-0.5 opacity-80 tabular-nums", colorConfig.text)}>
                                        {Math.floor(event.startHour)}:{String(Math.round((event.startHour % 1) * 60)).padStart(2, '0')} - {Math.floor(event.endHour)}:{String(Math.round((event.endHour % 1) * 60)).padStart(2, '0')}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Dialogs */}
            <Dialog.Root open={isDialogOpen} onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) {
                    setNewEvent({ title: '', day: 0, startHour: 9, endHour: 10, color: 'Teal' });
                }
            }}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-surface-dark rounded-2xl shadow-2xl p-6 z-50 animate-in zoom-in-95 fade-in duration-200 border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center justify-between mb-6">
                            <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 text-balance">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <IconCalendar stroke={1.5} />
                                </div>
                                {newEvent.id ? t.editActivity : t.newActivity}
                            </Dialog.Title>
                            <Dialog.Close asChild>
                                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors" aria-label={t.cancel}>
                                    <IconX className="size-5" />
                                </button>
                            </Dialog.Close>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">{t.activityTitle}</label>
                                <input
                                    type="text"
                                    autoFocus
                                    className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-gray-900 dark:text-white text-pretty"
                                    placeholder={t.activityPlaceholder}
                                    value={newEvent.title}
                                    onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">{t.day}</label>
                                    <select
                                        className="w-full h-11 px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary transition-all outline-none text-gray-900 dark:text-white"
                                        value={newEvent.day}
                                        onChange={e => setNewEvent({ ...newEvent, day: parseInt(e.target.value) })}
                                    >
                                        {t.days.map((day, i) => (
                                            <option key={i} value={i}>{day}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">{t.color}</label>
                                    <div className="flex items-center gap-2 h-11">
                                        {COLORS.map((c) => (
                                            <button
                                                key={c.name}
                                                onClick={() => setNewEvent({ ...newEvent, color: c.name })}
                                                className={cn(
                                                    "size-7 rounded-full transition-all ring-offset-2 dark:ring-offset-surface-dark",
                                                    c.dot,
                                                    newEvent.color === c.name ? "ring-2 ring-primary scale-110" : "hover:scale-110"
                                                )}
                                                aria-label={c.name}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">{t.startTime}</label>
                                    <div className="relative">
                                        <IconClock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                                        <input
                                            type="time"
                                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary transition-all outline-none text-gray-900 dark:text-white tabular-nums"
                                            value={format(addHours(startOfDay(new Date()), newEvent.startHour || 0), 'HH:mm')}
                                            onChange={e => {
                                                const [h, m] = e.target.value.split(':').map(Number);
                                                setNewEvent({ ...newEvent, startHour: h + m / 60 });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">{t.endTime}</label>
                                    <div className="relative">
                                        <IconClock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                                        <input
                                            type="time"
                                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary transition-all outline-none text-gray-900 dark:text-white tabular-nums"
                                            value={format(addHours(startOfDay(new Date()), newEvent.endHour || 0), 'HH:mm')}
                                            onChange={e => {
                                                const [h, m] = e.target.value.split(':').map(Number);
                                                setNewEvent({ ...newEvent, endHour: h + m / 60 });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <Dialog.Close asChild>
                                    <button className="flex-1 h-11 rounded-xl font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        {t.cancel}
                                    </button>
                                </Dialog.Close>
                                <button
                                    onClick={handleAddEvent}
                                    disabled={!newEvent.title}
                                    className="flex-1 h-11 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    {t.save}
                                </button>
                            </div>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            <AlertDialog.Root open={!!eventToDelete} onOpenChange={(open) => !open && setEventToDelete(null)}>
                <AlertDialog.Portal>
                    <AlertDialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
                    <AlertDialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-sm bg-white dark:bg-surface-dark rounded-2xl shadow-2xl p-6 z-50 animate-in zoom-in-95 fade-in duration-200 border border-gray-100 dark:border-gray-800">
                        <AlertDialog.Title className="text-xl font-bold text-gray-900 dark:text-white text-balance mb-2">
                            {t.deleteTitle}
                        </AlertDialog.Title>
                        <AlertDialog.Description className="text-gray-500 dark:text-gray-400 text-sm mb-6 text-pretty">
                            {t.deleteDescription}
                        </AlertDialog.Description>
                        <div className="flex gap-3">
                            <AlertDialog.Cancel asChild>
                                <button className="flex-1 h-11 rounded-xl font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                    {t.cancel}
                                </button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action asChild>
                                <button
                                    onClick={() => eventToDelete && handleDeleteConfirm(eventToDelete)}
                                    className="flex-1 h-11 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg shadow-red-500/20 transition-all active:scale-95"
                                >
                                    {t.deleteAction}
                                </button>
                            </AlertDialog.Action>
                        </div>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        </div>
    );
}
