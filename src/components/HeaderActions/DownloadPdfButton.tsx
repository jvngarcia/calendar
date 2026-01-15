import React from 'react';
import { IconDownload } from '@tabler/icons-react';
import { useCalendarStore } from '../../lib/store';
import { translations } from '../../lib/i18n';
import { domToCanvas } from "modern-screenshot";
import { jsPDF } from "jspdf";

export default function DownloadPdfButton() {
    const lang = useCalendarStore(state => state.lang);
    const t = translations[lang];

    const handleDownload = async () => {
        const calendar = document.getElementById('calendar-to-export');
        if (!calendar) return;

        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) document.documentElement.classList.remove('dark');

        try {
            const canvas = await domToCanvas(calendar, {
                scale: 2,
                backgroundColor: "#ffffff",
            });

            if (isDark) document.documentElement.classList.add('dark');

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "landscape",
                unit: "mm",
                format: "letter",
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 10;
            const maxW = pageWidth - margin * 2;
            const maxH = pageHeight - margin * 4;

            const ratio = canvas.width / canvas.height;
            let imgW = maxW;
            let imgH = imgW / ratio;

            if (imgH > maxH) {
                imgH = maxH;
                imgW = imgH * ratio;
            }

            const x = (pageWidth - imgW) / 2;
            const y = margin;

            pdf.addImage(imgData, "PNG", x, y, imgW, imgH);
            pdf.setFontSize(10);
            pdf.setTextColor(150, 150, 150);
            pdf.text("Creado con una herramienta de holasoy.dev", pageWidth / 2, pageHeight - margin, { align: "center" });

            pdf.save(`planificador-${new Date().getTime()}.pdf`);
        } catch (err) {
            console.error("Error generating PDF", err);
            if (isDark) document.documentElement.classList.add('dark');
        }
    };

    return (
        <button
            onClick={handleDownload}
            className="flex cursor-pointer items-center justify-center h-10 px-5 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-bold shadow-lg shadow-primary/25 transition-all active:scale-95 gap-2"
        >
            <IconDownload stroke={1.25} />
            <span>{t.downloadPDF}</span>
        </button>
    );
}
