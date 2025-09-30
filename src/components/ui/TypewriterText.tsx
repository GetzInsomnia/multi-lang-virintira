"use client";

import { useEffect, useRef, useState } from 'react';

interface TypewriterTextProps {
  phrases: string[];
  interval?: number;
}

export function TypewriterText({ phrases, interval = 2800 }: TypewriterTextProps) {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const pauseRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!phrases.length) return;

    const current = phrases[index % phrases.length];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const nextText = current.slice(0, displayText.length + 1);
        setDisplayText(nextText);
        if (nextText === current) {
          if (pauseRef.current) clearTimeout(pauseRef.current);
          pauseRef.current = setTimeout(() => setIsDeleting(true), interval / 2);
        }
      } else {
        const nextText = current.slice(0, Math.max(0, displayText.length - 1));
        setDisplayText(nextText);
        if (nextText === '') {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? 45 : 85);

    return () => clearTimeout(timeout);
  }, [phrases, index, displayText, isDeleting, interval]);

  useEffect(() => {
    return () => {
      if (pauseRef.current) {
        clearTimeout(pauseRef.current);
      }
    };
  }, []);

  return (
    <span className="whitespace-nowrap border-r-2 border-[#A70909] pr-2 text-[#A70909]">
      {displayText}
    </span>
  );
}
