'use client';

import dynamic from 'next/dynamic';

const PdfDownload = dynamic(() => import('@/components/PdfDownload'), { ssr: false });

export default function CvPage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-primary p-8">
            <h1 className="mb-6 text-2xl font-jetbrains text-white">CV — Arturo Montes</h1>
            <PdfDownload />
        </main>
    );
}
