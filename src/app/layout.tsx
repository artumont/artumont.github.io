import type { Metadata } from "next";
import { inter, jetBrainsMono } from "@/fonts/fonts";
import "./globals.css";

export const metadata: Metadata = {
    title: 'Artu - FullStack Developer Portfolio',
    description: 'Experienced developer specializing in modern web technologies and full-stack development.',
    keywords: 'fullstack developer, web development, portfolio, software engineer, Artu, artumont',
    authors: [{ name: 'Artu' }],
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: 'Artu - FullStack Developer Portfolio',
        description: 'Experienced developer specializing in modern web technologies and full-stack development.',
        type: 'website',
        images: [{
            url: 'https://avatars.githubusercontent.com/u/197291181?v=4',
        }],
    },
    icons: {
        icon: 'https://avatars.githubusercontent.com/u/197291181?v=4',
    },
    alternates: {
        canonical: 'https://artumont.github.io',
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
