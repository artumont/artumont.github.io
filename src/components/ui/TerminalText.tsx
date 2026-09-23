'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

interface TerminalTextProps {
    text: string;
    delay?: number;
    className?: string;
    useIndicator?: boolean;
}

export default function TerminalText({ text, delay = 100, className = '', useIndicator = false }: TerminalTextProps) {
    const prefersReducedMotion = useReducedMotion();
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Con `prefers-reduced-motion` el texto completo ya está renderizado: no se anima.
        if (prefersReducedMotion) {
            return;
        }

        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, delay);

            return () => clearTimeout(timeout);
        }
    }, [text, delay, currentIndex, prefersReducedMotion]);

    return (
        // El contenido depende de una media query del cliente: el HTML del servidor no
        // puede saberla, así que se declara explícitamente que el texto puede diferir.
        <div className={className} suppressHydrationWarning>
            {prefersReducedMotion ? text : displayText}
            {useIndicator && <span className="animate-blink">_</span>}
        </div>
    );
}
