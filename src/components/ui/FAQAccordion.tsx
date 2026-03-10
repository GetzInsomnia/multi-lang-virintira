"use client";
/* eslint-disable react/no-danger */

import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
    const [openIndices, setOpenIndices] = useState<number[]>([]);

    const toggleAccordion = (idx: number) => {
        setOpenIndices((current) =>
            current.includes(idx)
                ? current.filter((i) => i !== idx)
                : [...current, idx]
        );
    };

    return (
        <div className="space-y-4">
            {items.map((item, idx) => {
                const isOpen = openIndices.includes(idx);
                return (
                    <div key={idx} className="group rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden transition-shadow hover:shadow-md">
                        <button
                            onClick={() => toggleAccordion(idx)}
                            className="flex w-full items-center justify-between gap-4 p-6 text-left text-gray-900 focus:outline-none"
                            aria-expanded={isOpen}
                        >
                            <div className="flex items-start sm:items-center gap-3 font-semibold text-base sm:text-lg">
                                <span className="text-[#A70909] flex-shrink-0 pt-0.5 sm:pt-0">Q.</span>
                                <span className="text-gray-900 leading-snug">{item.question}</span>
                            </div>
                            <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex-shrink-0 mt-1 sm:mt-0"
                            >
                                <FaChevronDown className="h-4 w-4 text-gray-400" />
                            </motion.div>
                        </button>
                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="px-6 pb-6 pt-1 sm:px-10 sm:pb-8">
                                        <div className="space-y-3">
                                            {item.answer.split('\n').map((line, i) => {
                                                const trimmed = line.trim();
                                                const bulletMatch = trimmed.match(/^(•|-|\*)\s*(.*)/);
                                                const numberMatch = trimmed.match(/^(\d+)\.\s*(.*)/);

                                                if (bulletMatch) {
                                                    return (
                                                        <div key={i} className="flex items-start gap-3 pl-2 sm:pl-4">
                                                            <div className="mt-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#A70909]/70" />
                                                            <p className="leading-relaxed text-gray-600 flex-1" dangerouslySetInnerHTML={{ __html: bulletMatch[2] }} />
                                                        </div>
                                                    );
                                                }

                                                if (numberMatch) {
                                                    return (
                                                        <div key={i} className="flex items-start gap-3 pl-2 sm:pl-4">
                                                            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600 ring-2 ring-white">
                                                                {numberMatch[1]}
                                                            </div>
                                                            <p className="leading-tight text-gray-600 flex-1 pt-[1px]" dangerouslySetInnerHTML={{ __html: numberMatch[2] }} />
                                                        </div>
                                                    );
                                                }

                                                return (
                                                    <p key={i} className="leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: trimmed }} />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
