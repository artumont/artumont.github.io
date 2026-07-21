import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'CV - Arturo Montes',
    description: 'Download Arturo Montes CV in English or Spanish.',
    alternates: {
        canonical: '/cv',
    },
    openGraph: {
        title: 'CV - Arturo Montes',
        description: 'Backend & DevOps Engineer CV available in English and Spanish.',
        url: '/cv',
    },
};

export default function CvLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
