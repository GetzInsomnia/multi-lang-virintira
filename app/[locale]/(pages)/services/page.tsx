
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { servicesConfig } from '@/config/services';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FaCommentDots } from 'react-icons/fa6';
import { ServiceGrid, type ServiceGridItem } from '@/components/services/ServiceGrid';

export default async function ServicesPage({
    params: { locale },
}: {
    params: { locale: string };
}) {
    const tServices = await getTranslations({ locale, namespace: 'services' });
    const tCommon = await getTranslations({ locale, namespace: 'breadcrumbs' });
    const tCta = await getTranslations({ locale, namespace: 'layout.cta' });

    // Breadcrumbs
    const homeLabel = tCommon('home');
    const servicesLabel = tCommon('services');

    const breadcrumbs = [
        { label: servicesLabel, href: '/services' },
    ];

    // Prepare Grid Items
    const items: ServiceGridItem[] = servicesConfig.categories.map((category) => ({
        href: `/services/${category.categorySlug}`,
        imagePath: category.imagePath,
        title: tServices(`categories.${category.categorySlug}.title`),
        summary: tServices(`categories.${category.categorySlug}.summary`),
        ctaText: tCta('explore_category'),
        variant: 'default',
    }));

    // Add "Other Services" card
    items.push({
        href: "#contact-drawer", // Special href to trigger drawer
        imagePath: undefined,
        title: tServices('other.title'),
        summary: tServices('other.summary'),
        ctaText: tServices('other.cta'), 
        variant: 'dashed',
    });

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8">
                <Breadcrumbs items={breadcrumbs} homeLabel={homeLabel} />
            </div>

            <div className="mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-[#A70909] sm:text-5xl">
                    {tServices('hero.title')}
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-gray-600">
                    {tServices('hero.description') || "Explore our comprehensive range of services designed to help your business grow."}
                </p>
            </div>

            {/* Client Component for Animation */}
            <ServiceGrid items={items} />
        </div>
    );
}
