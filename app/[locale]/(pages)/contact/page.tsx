import ContactContent from "@/components/contact/ContactContent";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: "home.cta" });

    return {
        title: `Contact Us | Virintira`,
        description: t("description"),
    };
}

export default function ContactPage() {
    return <ContactContent />;
}
