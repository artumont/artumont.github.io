import type { Metadata } from "next";
import { MotionConfig } from "motion/react";
import { inter, jetBrainsMono } from "@/fonts/fonts";
import "./globals.css";

const SITE_URL = 'https://artumont.online';

export const metadata: Metadata = {
    // Sin `metadataBase`: todas las URLs de abajo son absolutas, así que no hay nada
    // relativo que resolver y el `new URL()` desaparece en vez de quedar envuelto.
    title: 'Arturo Montes - Backend & DevOps Engineer',
    description: 'Backend & DevOps Engineer building Python and FastAPI microservices, with Docker, Kubernetes, Terraform, and CI/CD automation. Hybrid in Monterrey, Nuevo León.',
    keywords: 'backend engineer, devops, docker, kubernetes, ci/cd, python, go, fastapi, microservices, infrastructure',
    authors: [{ name: 'Arturo Montes' }],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
    openGraph: {
        title: 'Arturo Montes - Backend & DevOps Engineer',
        description: 'Backend & DevOps Engineer building Python and FastAPI microservices, with Docker, Kubernetes, Terraform, and CI/CD automation. Hybrid in Monterrey, Nuevo León.',
        type: 'website',
        url: SITE_URL,
        siteName: 'Arturo Montes',
        images: [{
            url: 'https://avatars.githubusercontent.com/u/197291181?v=4',
        }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Arturo Montes - Backend & DevOps Engineer',
        description: 'Backend & DevOps Engineer building Python and FastAPI microservices, with Docker, Kubernetes, Terraform, and CI/CD automation. Hybrid in Monterrey, Nuevo León.',
        images: ['https://avatars.githubusercontent.com/u/197291181?v=4'],
    },
    icons: {
        icon: 'https://avatars.githubusercontent.com/u/197291181?v=4',
    },
    alternates: {
        canonical: SITE_URL,
    },
};

const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Arturo Montes',
    jobTitle: 'Backend & DevOps Engineer',
    url: 'https://artumont.online',
    email: 'artumontg@gmail.com',
    sameAs: [
        'https://github.com/artumont',
        'https://www.linkedin.com/in/artumont',
    ],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.variable} ${jetBrainsMono.variable} antialiased`}
			>   
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
				/>
				<MotionConfig reducedMotion="user">{children}</MotionConfig>
			</body>
		</html>
	);
}
