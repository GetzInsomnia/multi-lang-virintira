'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-4 px-4 text-center">
            <h2 className="text-xl font-semibold text-[#A70909]">Something went wrong!</h2>
            <p className="text-gray-600">We apologize for the inconvenience.</p>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                className="rounded-full bg-[#A70909] px-6 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#A70909] focus:ring-offset-2"
            >
                Try again
            </button>
        </div>
    );
}
