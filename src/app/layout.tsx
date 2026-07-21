import type { Metadata } from "next";
import { inter, jetBrainsMono } from "@/fonts/fonts";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL('https://artumont.online'),
    title: 'Arturo Montes - Backend & DevOps Engineer',
    description: 'Backend & DevOps Engineer specializing in Docker, Kubernetes, CI/CD pipelines, and scalable microservices architectures.',
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
        description: 'Backend & DevOps Engineer specializing in Docker, Kubernetes, CI/CD pipelines, and scalable microservices architectures.',
        type: 'website',
        url: '/',
        siteName: 'Arturo Montes',
        images: [{
            url: 'https://avatars.githubusercontent.com/u/197291181?v=4',
        }],
    },
    icons: {
        icon: 'https://avatars.githubusercontent.com/u/197291181?v=4',
    },
    alternates: {
        canonical: '/',
    },
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
				{children}
			</body>
		</html>
	);
}
