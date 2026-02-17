"use client";

import { useRef, useState, useEffect } from "react";
// useFormState is available in react-dom but types might be missing in stable channel
import { useFormState, useFormStatus } from "react-dom";
import { useTranslations, useLocale } from "next-intl";
import { submitContactForm } from "./actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faSpinner, faCheckCircle, faChevronDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faLine, faWhatsapp, faWeixin } from "@fortawesome/free-brands-svg-icons";

// Submit Button Component with Pending State
function SubmitButton({ label, loadingLabel }: { label: string; loadingLabel: string }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#A70909] px-6 py-3 text-base font-bold text-white shadow-lg transition-all hover:bg-[#8F0808] hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
        >
            {pending ? (
                <>
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                    {loadingLabel}
                </>
            ) : (
                <>
                    <FontAwesomeIcon icon={faPaperPlane} className="text-sm" />
                    {label}
                </>
            )}
        </button>
    );
}

export default function ContactForm() {
    const t = useTranslations('contact.form');
    const tServices = useTranslations('services.categories');
    const locale = useLocale();
    const [state, formAction] = useFormState(submitContactForm, {});
    const formRef = useRef<HTMLFormElement>(null);

    // Service Dropdown State
    const [selectedService, setSelectedService] = useState("");
    const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
    const serviceDropdownRef = useRef<HTMLDivElement>(null);

    // Social Platform State
    const [socialPlatform, setSocialPlatform] = useState("line");
    const [socialDropdownOpen, setSocialDropdownOpen] = useState(false);
    const socialDropdownRef = useRef<HTMLDivElement>(null);

    // Focus State for Helper Text
    const [focusedField, setFocusedField] = useState<string | null>(null);

    // Service Options (5 Main + Other)
    const serviceOptions = [
        { value: 'registrations', label: tServices('registrations.title') },
        { value: 'corporate-changes', label: tServices('corporate-changes.title') },
        { value: 'accounting-audit', label: tServices('accounting-audit.title') },
        { value: 'licensing', label: tServices('licensing.title') },
        { value: 'digital-marketing', label: tServices('digital-marketing.title') },
        { value: 'other', label: t('serviceOther') },
    ];

    const socialOptions = [
        { value: 'line', label: 'Line', icon: faLine, color: 'text-[#06C755]' },
        { value: 'whatsapp', label: 'WhatsApp', icon: faWhatsapp, color: 'text-[#25D366]' },
        { value: 'wechat', label: 'WeChat', icon: faWeixin, color: 'text-[#7BB32E]' },
        { value: 'other', label: t('socialPlatforms.other'), icon: null, color: 'text-slate-500' },
    ];

    // Reset form on success
    if (state.success && formRef.current) {
        formRef.current.reset();
    }

    // Close dropdowns on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target as Node)) {
                setServiceDropdownOpen(false);
            }
            if (socialDropdownRef.current && !socialDropdownRef.current.contains(event.target as Node)) {
                setSocialDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Scroll to error message on compliance error
    useEffect(() => {
        if (!state.success && state.message && formRef.current) {
            const element = formRef.current;
            const headerOffset = 120; // Height of sticky header + gap
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    }, [state]);

    // Handle Service Selection
    const handleSelectService = (value: string) => {
        setSelectedService(value);
        setServiceDropdownOpen(false);
    };

    // Handle Social Selection
    const handleSelectSocial = (value: string) => {
        setSocialPlatform(value);
        setSocialDropdownOpen(false);
    };

    // Success & Error Refs for Scrolling
    const successRef = useRef<HTMLDivElement>(null);
    const errorRef = useRef<HTMLDivElement>(null);

    // Local error state to allow clearing on retry
    const [visibleError, setVisibleError] = useState<string | null>(null);

    // Sync server state message to local state + Auto-dismiss on cooldown
    useEffect(() => {
        if (state.message) {
            setVisibleError(state.message);

            // If it's a rate limit error with a specific cooldown
            if (state.message === 'errorRateLimit' && state.remaining) {
                const timer = setTimeout(() => {
                    setVisibleError(null);
                }, state.remaining * 1000);
                return () => clearTimeout(timer);
            }
        }
    }, [state]);

    // Scroll to success message
    useEffect(() => {
        if (state.success && successRef.current) {
            // Small delay to ensure render
            setTimeout(() => {
                successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }, [state.success]);

    // Scroll to error message (Mobile Friendly)
    useEffect(() => {
        if (!state.success && visibleError && errorRef.current) {
            setTimeout(() => {
                errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }, [visibleError, state.success]);

    // Clear error on user interaction
    const checkClearError = () => {
        if (visibleError) setVisibleError(null);
    };

    return (
        <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-[32px] bg-white shadow-2xl shadow-red-900/10">
            {/* Header - Red Theme */}
            {/* Header - Red Theme (Hidden on Success) */}
            {!state.success && (
                <div className="bg-[#A70909] px-8 py-8 text-center text-white">
                    <h2 className="mb-2 text-3xl font-bold">{t('heading')}</h2>
                    <p className="text-red-100 opacity-90">{t('subheading')}</p>
                </div>
            )}

            <div className="p-8 md:p-10">
                {state.success ? (
                    <div
                        ref={successRef}
                        className="flex flex-col items-center justify-center py-10 text-center text-green-600"
                    >
                        <div className="mb-6 rounded-full bg-green-100 p-4">
                            <FontAwesomeIcon icon={faCheckCircle} className="h-16 w-16 text-green-500" />
                        </div>
                        <h3 className="mb-3 text-3xl font-bold text-slate-900">{t('successTitle')}</h3>
                        <p className="max-w-md text-lg text-slate-600">{t('successMessage')}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-8 text-base font-semibold text-[#A70909] underline hover:text-[#8F0808]"
                        >
                            {t('sendAnother')}
                        </button>
                    </div>
                ) : (
                    <form action={formAction} ref={formRef} className="space-y-6">
                        {/* Honeypot for bots */}
                        <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

                        {/* Hidden Locale Field */}
                        <input type="hidden" name="locale" value={locale} />

                        {/* Global Error Message */}
                        {visibleError && (
                            <div
                                ref={errorRef}
                                className="rounded-xl border border-red-100 bg-red-50 p-4 text-center text-sm font-medium text-red-600 shadow-sm"
                            >
                                {t(visibleError)}
                            </div>
                        )}

                        {/* Name & Service */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-semibold text-slate-700">
                                    {t('name')} <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        onFocus={() => setFocusedField('name')}
                                        onBlur={() => setFocusedField(null)}
                                        onInput={(e) => {
                                            e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z\u0E00-\u0E7F\s]/g, '');
                                        }}
                                        pattern="^[a-zA-Z\u0E00-\u0E7F\s]+$"
                                        title="Letters and spaces only (Thai/English)"
                                        placeholder={t('namePlaceholder')}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 placeholder:text-sm placeholder:text-slate-400 outline-none transition-all focus:border-[#A70909] focus:bg-white focus:ring-2 focus:ring-[#A70909]/20"
                                    />
                                    {/* Helper Text on Focus */}
                                    <div className={`overflow-hidden transition-all duration-300 ${focusedField === 'name' ? 'max-h-10 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-xs text-[#A70909] font-medium pl-1">
                                            {t('nameHelper')}
                                        </p>
                                    </div>
                                </div>
                                <ErrorMessage errors={state.errors?.name} />
                            </div>

                            <div className="space-y-2 relative" ref={serviceDropdownRef}>
                                <label htmlFor="service" className="text-sm font-semibold text-slate-700">
                                    {t('service')} <span className="text-red-500">*</span>
                                </label>

                                <select
                                    name="service"
                                    id="service"
                                    required
                                    className="sr-only"
                                    value={selectedService}
                                    onChange={(e) => setSelectedService(e.target.value)}
                                >
                                    <option value="" disabled>Select</option>
                                    {serviceOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.value}</option>
                                    ))}
                                </select>

                                <button
                                    type="button"
                                    onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
                                    className={`flex w-full items-center justify-between rounded-xl border bg-slate-50 px-4 py-3 text-left transition-all focus:border-[#A70909] focus:bg-white focus:ring-2 focus:ring-[#A70909]/20 ${selectedService ? 'text-slate-900 text-base' : 'text-slate-400 text-sm'
                                        } ${serviceDropdownOpen ? 'border-[#A70909] ring-2 ring-[#A70909]/20 bg-white' : 'border-slate-200'}`}
                                >
                                    <span className="block truncate">
                                        {selectedService
                                            ? serviceOptions.find(opt => opt.value === selectedService)?.label
                                            : t('servicePlaceholder')
                                        }
                                    </span>
                                    <FontAwesomeIcon
                                        icon={faChevronDown}
                                        className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${serviceDropdownOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <ErrorMessage errors={state.errors?.service} />

                                {serviceDropdownOpen && (
                                    <div className="absolute left-0 top-full z-20 mt-2 w-full origin-top-right rounded-xl bg-white p-1 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="max-h-60 overflow-y-auto px-1 py-1 scrollbar-hide">
                                            {serviceOptions.map((option) => (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() => handleSelectService(option.value)}
                                                    className={`group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${selectedService === option.value
                                                        ? 'bg-red-50 text-[#A70909] font-medium'
                                                        : 'text-slate-700 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    {option.label}
                                                    {selectedService === option.value && (
                                                        <FontAwesomeIcon icon={faCheck} className="h-3 w-3 text-[#A70909]" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-semibold text-slate-700">
                                    {t('phone')} <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        required
                                        onFocus={() => setFocusedField('phone')}
                                        onBlur={() => setFocusedField(null)}
                                        onInput={(e) => {
                                            e.currentTarget.value = e.currentTarget.value.replace(/[^0-9+\-\s]/g, '');
                                        }}
                                        pattern="^[0-9+\-\s]+$"
                                        title="Numbers, spaces, and + symbol only"
                                        placeholder="0xx-xxx-xxxx"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 placeholder:text-sm placeholder:text-slate-400 outline-none transition-all focus:border-[#A70909] focus:bg-white focus:ring-2 focus:ring-[#A70909]/20"
                                    />
                                    {/* Helper Text on Focus */}
                                    <div className={`overflow-hidden transition-all duration-300 ${focusedField === 'phone' ? 'max-h-10 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-xs text-[#A70909] font-medium pl-1">
                                            {t('phoneHelper')}
                                        </p>
                                    </div>
                                </div>
                                <ErrorMessage errors={state.errors?.phone} />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                                    {t('email')} <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        onInput={(e) => {
                                            // Strictly allow only standard email characters
                                            e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z0-9.@_\-+]/g, '');
                                        }}
                                        pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                                        title="Please enter a valid email address"
                                        placeholder="name@company.com"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 placeholder:text-sm placeholder:text-slate-400 outline-none transition-all focus:border-[#A70909] focus:bg-white focus:ring-2 focus:ring-[#A70909]/20"
                                    />
                                    {/* Helper Text on Focus */}
                                    <div className={`overflow-hidden transition-all duration-300 ${focusedField === 'email' ? 'max-h-10 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-xs text-[#A70909] font-medium pl-1">
                                            {t('emailHelper')}
                                        </p>
                                    </div>
                                </div>
                                <ErrorMessage errors={state.errors?.email} />
                            </div>
                        </div>

                        {/* Social ID Selector + Input */}
                        <div className="space-y-2">
                            <label htmlFor="lineId" className="text-sm font-semibold text-slate-700">
                                {t('socialId')} <span className="font-normal text-slate-400">(Optional)</span>
                            </label>

                            <div className="flex gap-3">
                                {/* Platform Selector */}
                                <div className="relative w-1/3 min-w-[120px]" ref={socialDropdownRef}>
                                    <button
                                        type="button"
                                        onClick={() => setSocialDropdownOpen(!socialDropdownOpen)}
                                        className={`flex w-full items-center justify-between rounded-xl border bg-slate-50 px-3 py-3 text-left transition-all hover:bg-white focus:border-[#A70909] focus:ring-2 focus:ring-[#A70909]/20 font-sans ${socialDropdownOpen ? 'border-[#A70909] ring-2 ring-[#A70909]/20 bg-white' : 'border-slate-200'
                                            }`}
                                    >
                                        {(() => {
                                            const selected = socialOptions.find(opt => opt.value === socialPlatform);
                                            return (
                                                <div className="flex items-center gap-2 overflow-hidden">
                                                    {selected?.icon && (
                                                        <FontAwesomeIcon icon={selected.icon} className={`h-4 w-4 ${selected.color}`} />
                                                    )}
                                                    <span className="truncate text-base font-medium text-slate-700 font-sans">{selected?.label}</span>
                                                </div>
                                            );
                                        })()}
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${socialDropdownOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    {socialDropdownOpen && (
                                        <div className="absolute left-0 top-full z-20 mt-2 w-full min-w-[140px] origin-top-left rounded-xl bg-white p-1 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {socialOptions.map((option) => (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() => handleSelectSocial(option.value)}
                                                    className={`group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors font-sans ${socialPlatform === option.value
                                                        ? 'bg-red-50 text-slate-900 font-medium'
                                                        : 'text-slate-600 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    {option.icon && (
                                                        <FontAwesomeIcon icon={option.icon} className={`h-4 w-4 ${option.color}`} />
                                                    )}
                                                    <span className="font-sans">{option.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* ID Input */}
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        name="lineId" // Keeping name lineId for server action compatibility
                                        id="lineId"
                                        placeholder={t('socialIdPlaceholder')}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 placeholder:text-sm placeholder:text-slate-400 outline-none transition-all focus:border-[#A70909] focus:bg-white focus:ring-2 focus:ring-[#A70909]/20"
                                    />
                                    {/* Hidden Input to send Platform Name if we wanted to handle it separately, 
                                        but for now we just let user type ID. 
                                        If we need to join them, we'd need a hidden field or composite name.
                                        Let's stick to simple UI for now. User knows what they selected. 
                                        Actually, to make it useful, we should probably prefix it? 
                                        For now, keeping it simple as requested: "Select what ID type".
                                    */}
                                    <input type="hidden" name="socialPlatform" value={socialPlatform} />
                                </div>
                            </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-semibold text-slate-700">
                                {t('message')} <span className="font-normal text-slate-400">(Optional)</span>
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                rows={4}
                                placeholder={t('messagePlaceholder')}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 placeholder:text-sm placeholder:text-slate-400 outline-none transition-all focus:border-[#A70909] focus:bg-white focus:ring-2 focus:ring-[#A70909]/20"
                            />
                        </div>

                        <SubmitButton label={t('submit')} loadingLabel={t('sending')} />
                    </form>
                )}
            </div>
        </div>
    );
}

function ErrorMessage({ errors }: { errors?: string[] }) {
    if (!errors?.length) return null;
    return (
        <p className="text-xs font-semibold text-red-500">
            {errors[0]}
        </p>
    );
}
