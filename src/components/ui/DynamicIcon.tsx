import { LucideProps } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface DynamicIconProps extends LucideProps {
    name?: string;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
    if (!name) return <LucideIcons.CheckCircle2 {...props} />;

    // Attempt to find the icon component in the lucide-react module
    const Icon = (LucideIcons as any)[name];

    // Fallback if the name is invalid or not found
    if (!Icon) {
        return <LucideIcons.CheckCircle2 {...props} />;
    }

    return <Icon {...props} />;
}
