"use client"
import React, { useState, useEffect } from 'react';

const scrambleChars = '!@#$%^&*()_+[]{}|;:,./<>?~`1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

interface TextEncoderProps {
    text: string;
    className?: string;
}

const TextEncoder: React.FC<TextEncoderProps> = ({ text, className = '' }) => {
    const [displayText, setDisplayText] = useState('');
    const [isRevealed, setIsRevealed] = useState(false);

    useEffect(() => {
        let timeouts: NodeJS.Timeout[] = [];

        if (!isRevealed) {
            // Reveal animation - character by character
            const revealChars = () => {
                for (let i = 0; i < text.length; i++) {
                    const timeout = setTimeout(() => {
                        setDisplayText(prev => {
                            const newText = prev.split('');
                            newText[i] = text[i];
                            return newText.join('');
                        });
                    }, i * 50); // 50ms delay between each character
                    timeouts.push(timeout);
                }
            };

            // Initialize with scrambled text
            setDisplayText(text.split('').map(char =>
                char === ' ' ? ' ' : scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
            ).join(''));

            revealChars();
        } else {
            // Hide animation - scramble all at once, then animate scrambling
            let scrambleInterval: NodeJS.Timeout;
            let scrambleCount = 0;

            const scrambleAnimation = () => {
                scrambleInterval = setInterval(() => {
                    setDisplayText(text.split('').map(char =>
                        char === ' ' ? ' ' : scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
                    ).join(''));

                    scrambleCount++;
                    if (scrambleCount > 5) {
                        clearInterval(scrambleInterval);
                    }
                }, 100);
            };

            scrambleAnimation();

            return () => {
                if (scrambleInterval) clearInterval(scrambleInterval);
            };
        }

        return () => {
            timeouts.forEach(timeout => clearTimeout(timeout));
        };
    }, [isRevealed, text]);

    return (
        <span
            onMouseEnter={() => setIsRevealed(true)}
            onMouseLeave={() => setIsRevealed(false)}
            className={` cursor-pointer select-none transition-all duration-300 ${className}`}
            style={{
                fontFamily: 'Monaco, Consolas, "Lucida Console", monospace',
                letterSpacing: '0.5px'
            }}
        >
            {displayText || text.split('').map(() => ' ').join('')}
        </span>
    );
};

export default TextEncoder;