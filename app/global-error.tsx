'use client';

import { useEffect } from 'react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html>
            <body className="flex min-h-screen flex-col items-center justify-center bg-white p-4 text-center">
                <h2 className="mb-4 text-2xl font-bold text-[#A70909]">Something went wrong!</h2>
                <p className="mb-6 text-gray-600">
                    A critical error occurred. Please try refreshing the page.
                </p>
                <button
                    onClick={() => reset()}
                    className="rounded-full bg-[#A70909] px-6 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#A70909] focus:ring-offset-2"
                >
                    Try again
                </button>
            </body>
        </html>
    );
}
