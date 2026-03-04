import React from 'react';
import { StaggerContainer, StaggerItem } from '@/components/ui/StaggerContainer';
import { ScanEye, Atom, Goal, HeartHandshake } from 'lucide-react';

interface CoreValuesProps {
    cards: { title: string; description: string }[];
}

export default function CoreValues({ cards }: CoreValuesProps) {
    const renderValueIcon = (index: number) => {
        const iconClasses = "h-11 w-11 text-[#A70909]";
        const strokeW = 1.75; // Optimal premium stroke weight for lucide

        switch (index) {
            case 0:
                // 1. ความซื่อตรงและโปร่งใส (Integrity & Transparency) - ScanEye (Transparency/Scrutiny)
                return <ScanEye className={iconClasses} strokeWidth={strokeW} />;
            case 1:
                // 2. ความเชี่ยวชาญรอบด้าน (All-around Expertise) - Atom (Comprehensive Knowledge)
                return <Atom className={iconClasses} strokeWidth={strokeW} />;
            case 2:
                // 3. ความรับผิดชอบระดับมืออาชีพ (Professional Responsibility) - Goal (Target hit with Arrow)
                return <Goal className={iconClasses} strokeWidth={strokeW} />;
            case 3:
                // 4. ความเปิดเผยและจริงใจ (Openness and Sincerity) - HeartHandshake (Sincerity/Trust)
                return <HeartHandshake className={iconClasses} strokeWidth={strokeW} />;
            default:
                return null;
        }
    };

    return (
        <StaggerContainer className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:gap-x-12 lg:gap-y-12 max-w-6xl mx-auto auto-rows-fr">
            {cards.map((parsed, i) => {
                return (
                    <StaggerItem key={i} className="h-full">
                        <div className="flex flex-col sm:flex-row items-center gap-6 group h-full p-6 transition-all">
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#FFF5F5] ring-1 ring-[#A70909]/10">
                                {renderValueIcon(i)}
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {parsed.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-balance">
                                    {parsed.description}
                                </p>
                            </div>
                        </div>
                    </StaggerItem>
                );
            })}
        </StaggerContainer>
    );
}
