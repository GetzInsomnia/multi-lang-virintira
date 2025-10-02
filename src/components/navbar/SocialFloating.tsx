import { COMPANY } from '@/data/company';

const links = [
  { href: `tel:${COMPANY.phone}`, label: 'Call', color: 'bg-virintira-primary', text: 'text-white' },
  { href: COMPANY.socials.line, label: 'LINE', color: 'bg-[#06C755]', text: 'text-white', external: true },
  { href: `mailto:${COMPANY.email}`, label: 'Email', color: 'bg-white', text: 'text-virintira-primary', border: 'border border-virintira-primary/40' },
];

export function SocialFloating() {
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden flex-col gap-3 lg:flex">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={`inline-flex min-w-[140px] items-center justify-center rounded-full px-5 py-3 text-sm font-semibold shadow-xl transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-virintira-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white ${link.color} ${link.text} ${link.border ?? ''}`}
          target={link.external ? '_blank' : undefined}
          rel={link.external ? 'noopener noreferrer' : undefined}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
