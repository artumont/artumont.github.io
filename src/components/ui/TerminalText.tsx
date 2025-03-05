'use client';

import { useEffect, useState } from 'react';

interface TerminalTextProps {
    text: string;
    delay?: number;
    className?: string;
    useIndicator?: boolean;
}

export default function TerminalText({ text, delay = 100, className = '', useIndicator = false }: TerminalTextProps) {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, delay);

            return () => clearTimeout(timeout);
        }
    }, [text, delay, currentIndex]);

    return (
        <div className={`${className}`}>
            {displayText}
            {useIndicator && <span className="animate-blink">_</span>}
        </div>
    );
}
