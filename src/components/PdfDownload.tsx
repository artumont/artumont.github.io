'use client';

import { useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import CvPdf from './CvPdf';
import type { CvLanguage } from '@/data/cv-data';

const languages: { code: CvLanguage; label: string; fileName: string }[] = [
    { code: 'en', label: 'English', fileName: 'arturo-montes-cv-en.pdf' },
    { code: 'es', label: 'Español', fileName: 'arturo-montes-cv-es.pdf' },
];

export default function PdfDownload() {
    const [previewLanguage, setPreviewLanguage] = useState<CvLanguage>('en');

    return (
        <div className="flex w-full max-w-[900px] flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-3">
                {languages.map(({ code, label, fileName }) => (
                    <PDFDownloadLink
                        key={code}
                        document={<CvPdf language={code} />}
                        fileName={fileName}
                        className="rounded-lg border border-accent/50 bg-accent/20 px-6 py-3 font-jetbrains text-white transition-colors hover:bg-accent/30"
                    >
                        {({ loading }) => loading ? `Generating ${label}...` : `Download CV — ${label}`}
                    </PDFDownloadLink>
                ))}
            </div>

            <div className="flex gap-2">
                {languages.map(({ code, label }) => (
                    <button
                        key={code}
                        type="button"
                        onClick={() => setPreviewLanguage(code)}
                        className={`rounded-lg px-4 py-2 font-jetbrains text-sm transition-colors ${
                            previewLanguage === code ? 'bg-terciary text-white' : 'bg-secondary text-accent hover:bg-terciary'
                        }`}
                    >
                        Preview {label}
                    </button>
                ))}
            </div>

            <div className="h-[900px] w-full overflow-hidden rounded-lg border border-accent/20">
                <PDFViewer key={previewLanguage} width="100%" height="100%">
                    <CvPdf language={previewLanguage} />
                </PDFViewer>
            </div>
        </div>
    );
}
