import Image from 'next/image';
import { ServiceLayout } from '@/components/services/ServiceLayout';

export default function ServiceLoading() {
    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center p-8">
            <div className="relative h-32 w-32 animate-pulse">
                <Image
                    src="/logo.png"
                    alt="Loading..."
                    fill
                    className="object-contain"
                />
            </div>
            <p className="mt-4 text-sm font-medium text-[#A70909] animate-pulse">Loading...</p>
        </div>
    );
}
