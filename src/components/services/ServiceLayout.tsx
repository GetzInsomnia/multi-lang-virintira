import { ReactNode } from 'react';

interface ServiceLayoutProps {
    breadcrumbs: ReactNode;
    sidebar?: ReactNode;
    children: ReactNode;
}

export function ServiceLayout({
    breadcrumbs,
    sidebar,
    children,
}: ServiceLayoutProps) {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Breadcrumbs Area */}
            <div className="mb-6">{breadcrumbs}</div>

            {sidebar ? (
                <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-12 xl:grid-cols-[18rem_1fr]">
                    {/* Sidebar (Desktop Sticky / Mobile Accordion handled by component) */}
                    <aside className="mb-8 block lg:mb-0">
                        <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
                            {sidebar}
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="min-w-0">
                        {children}
                    </main>
                </div>
            ) : (
                <main className="min-w-0">
                    {children}
                </main>
            )}
        </div>
    );
}
