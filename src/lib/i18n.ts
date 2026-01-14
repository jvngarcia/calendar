export const translations = {
    ES: {
        title: "Planificador Semanal",
        subtitle: "Horario de productividad",
        clearAll: "Borrar Todo",
        downloadPDF: "Descargar PDF",
        days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
        hour: "Hora",
        newActivity: "Nueva Actividad",
        activityTitle: "Título",
        activityPlaceholder: "Ej: Reunión, Entrenamiento...",
        day: "Día",
        color: "Color",
        startTime: "Hora Inicio",
        endTime: "Hora Fin",
        cancel: "Cancelar",
        save: "Guardar",
        settings: "Configuración",
        startHourLabel: "Hora de Inicio",
        endHourLabel: "Hora de Fin",
        deleteTitle: "¿Eliminar actividad?",
        deleteDescription: "Esta acción no se puede deshacer. La actividad será eliminada permanentemente de tu horario.",
        deleteAction: "Eliminar",
        clearAllTitle: "¿Borrar todas las actividades?",
        clearAllDescription: "Esta acción eliminará permanentemente todas las actividades de tu horario semanal. No se puede deshacer.",
        copy: "Copiar",
        editActivity: "Editar Actividad",
        edit: "Editar",
        defaultEvents: [
            { title: "Reunión de Equipo", day: 0, startHour: 10, endHour: 12, color: "Teal" },
            { title: "Almuerzo", day: 2, startHour: 14, endHour: 15.5, color: "Sky" }
        ]
    },
    EN: {
        title: "Weekly Planner",
        subtitle: "Productivity Schedule",
        clearAll: "Clear All",
        downloadPDF: "Download PDF",
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        hour: "Hour",
        newActivity: "New Activity",
        activityTitle: "Title",
        activityPlaceholder: "e.g., Meeting, Training...",
        day: "Day",
        color: "Color",
        startTime: "Start Time",
        endTime: "End Time",
        cancel: "Cancel",
        save: "Save",
        settings: "Settings",
        startHourLabel: "Start Hour",
        endHourLabel: "End Hour",
        deleteTitle: "Delete activity?",
        deleteDescription: "This action cannot be undone. The activity will be permanently removed from your schedule.",
        deleteAction: "Delete",
        clearAllTitle: "Clear all activities?",
        clearAllDescription: "This will permanently remove all activities from your weekly schedule. This action cannot be undone.",
        copy: "Copy",
        editActivity: "Edit Activity",
        edit: "Edit",
        defaultEvents: [
            { title: "Team Meeting", day: 0, startHour: 10, endHour: 12, color: "Teal" },
            { title: "Lunch", day: 2, startHour: 14, endHour: 15.5, color: "Sky" }
        ]
    }
};

export type Language = keyof typeof translations;
