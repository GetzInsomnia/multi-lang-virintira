import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Utility: Parse colon-separated string into Title and Description, handling both CJK Full-Width (：) and Latin (:) colons dynamically
export const parseCardString = (text: string) => {
    const parts = text.split(/[:：]/);
    if (parts.length > 1) {
        return { title: parts[0].trim(), description: parts.slice(1).join(':').trim() };
    }
    return { title: text, description: '' };
};
