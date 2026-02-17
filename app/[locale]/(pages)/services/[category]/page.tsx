import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { servicesConfig } from '@/config/services';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FaCommentDots } from 'react-icons/fa6';
import { ServiceGrid, type ServiceGridItem } from '@/components/services/ServiceGrid';

import { ServiceLayout } from '@/components/services/ServiceLayout';

interface PageProps {
    params: {
        locale: string;
        category: string;
    };
}

export async function generateStaticParams() {
    return servicesConfig.categories.map((cat) => ({
        category: cat.categorySlug,
    }));
}

export default async function ServiceCategoryPage({ params }: PageProps) {
    const { locale, category } = params;

    // 1. Validate Category
    const categoryConfig = servicesConfig.categories.find(
        (c) => c.categorySlug === category
    );
    if (!categoryConfig) return notFound();

    // 2. Load Translations
    const tServices = await getTranslations({ locale, namespace: 'services' });
    const tBreadcrumbs = await getTranslations({ locale, namespace: 'breadcrumbs' });
    const tCta = await getTranslations({ locale, namespace: 'layout.cta' });

    // 3. Prepare Data
    const categoryTitle = tServices(`categories.${category}.title`);
    const categorySummary = tServices(`categories.${category}.summary`);

    const items: ServiceGridItem[] = categoryConfig.items.map((item) => ({
        href: `/services/${category}/${item.serviceSlug}`,
        imagePath: item.imagePath,
        title: tServices(`items.${item.serviceSlug}.title`),
        summary: tServices(`items.${item.serviceSlug}.summary`),
        ctaText: tCta('view_details'),
        variant: 'default',
    }));

    // Add "Other Services" card
    items.push({
        href: "#contact-drawer",
        imagePath: undefined,
        title: tServices('other.title'),
        summary: tServices('other.summary'),
        ctaText: tServices('other.cta'),
        variant: 'dashed',
    });

    const breadcrumbs = [
        { label: tBreadcrumbs('services'), href: '/services' },
        { label: categoryTitle, href: `/services/${category}` },
    ];

    const tCommon = await getTranslations({ locale, namespace: 'breadcrumbs' });
    const homeBreadcrumb = tCommon('home');

    return (
        <ServiceLayout
            breadcrumbs={<Breadcrumbs items={breadcrumbs} homeLabel={homeBreadcrumb} />}
        >
            <div className="space-y-8">
                {/* Header */}
                <div className="space-y-4 border-b border-gray-100 pb-8">
                    <h1 className="text-3xl font-bold text-[#A70909] sm:text-4xl">
                        {categoryTitle}
                    </h1>
                    <p className="max-w-3xl text-lg text-gray-600">
                        {categorySummary}
                    </p>
                </div>

                {/* Sub-services Grid via Client Component */}
                <ServiceGrid items={items} />

                {items.length === 0 && (
                    <div className="col-span-full rounded-xl border border-dashed border-gray-200 p-8 text-center text-gray-500">
                        Coming soon. Please check back later.
                    </div>
                )}
            </div>
        </ServiceLayout>
    );
}
