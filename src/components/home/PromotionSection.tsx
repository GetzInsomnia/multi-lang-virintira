import { Link } from '@/i18n/routing';
import { normalizeInternalHref } from '@/lib/links';
import { ChevronRight } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';

export function PromotionSection({
  locale,
  heading,
  description,
  ctaLabel,
  ctaHref,
  badge,
  complimentary,
}: {
  locale: string;
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  badge: string;
  complimentary: string;
}) {
  return (
    <section
      id="promotion"
      lang={locale}
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden py-24"
    >
      {/* 
        Background Strategy (Round 11 - Taller Section, Prettier Gradient):
        1. Height increased to 80vh to give content room.
        2. Gradient reverted to 40% start (User preference) for better aesthetics.
      */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(to bottom, #fff4f4 0%, #fff4f4 40%, #A70909 100%)' }}
      >
        {/* Dot Pattern - Strictly Centered & Faded */}
        <div className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: 'radial-gradient(#A70909 0.5px, transparent 0.5px)',
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)'
          }}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4">
        {/* 
          Glass Card (Round 15 - Refined):
          - Removed hover:scale (User request: too much movement).
          - 'group' class ensures child elements (Disclaimer) can react to card hover.
        */}
        <div className="group relative overflow-hidden rounded-[42px] border border-white/60 bg-white/90 shadow-[0_30px_80px_rgba(167,9,9,0.08)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_40px_100px_rgba(167,9,9,0.12)] hover:bg-white/95">
          <div className="flex flex-col gap-10 px-6 py-12 lg:px-12 lg:py-20">
            <div className="space-y-8 text-left">
              {/* 
                Badge (Round 15): 
                - Icon: faFire (FontAwesome) matching Navbar.
                - Animation: Shimmering Gradient Background.
              */}
              <div className="flex items-start">
                <span className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#A70909] via-[#ff4e50] to-[#A70909] bg-[length:200%_auto] px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-red-900/20 animate-shimmer-gradient">
                  <span>
                    <FontAwesomeIcon icon={faFire} className="h-3 w-3 text-yellow-300 drop-shadow-sm" />
                  </span>
                  {badge}
                </span>
              </div>

              <div className="space-y-6">
                {heading ? (
                  <h2 className="max-w-none text-[clamp(2.5rem,2rem+2.5vw,5rem)] font-extrabold leading-[1.1] text-[#2d1f1f] drop-shadow-sm text-balance whitespace-pre-line">
                    {heading}
                  </h2>
                ) : null}

                {description ? (
                  <p className="max-w-none text-xl leading-relaxed text-[#5d3f3f]/90 font-medium">
                    {description}
                  </p>
                ) : null}
              </div>

              {/* 
                Footer Row (Round 25 - Layout Optimization):
                - Removed 'justify-between' to prevent button from pasting to the edge.
                - Added 'gap-10' + 'sm:pr-10' to balance spacing.
                - Used 'flex-1' on disclaimer to allow it to expand and push content responsibly.
              */}
              <div className="flex flex-col gap-8 pt-4 sm:flex-row sm:items-center sm:gap-10 w-full max-w-6xl sm:pr-10">
                {/* 
                  Disclaimer (Round 22 - Swapped Order):
                  - Moved to LEFT side (was on Right).
                  - Thicker Checkmark (stroke-width 3).
                  - Interactivity: Scales up when the Card (group) is hovered.
                  - Added 'sm:flex-1 sm:min-w-0' to handle layout properly.
                */}
                <div className="flex items-center gap-3 text-[#A70909] font-bold text-sm tracking-wide transition-transform duration-300 origin-left group-hover:scale-105 sm:flex-1 sm:min-w-0">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#A70909]/10 shrink-0">
                    <svg className="w-3.5 h-3.5 fill-current stroke-current stroke-[1.5]" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  </div>
                  <span className="min-w-0 break-words">{complimentary}</span>
                </div>

                {/* 
                  Button (Round 22 - Swapped Order):
                  - Moved to RIGHT side (was on Left).
                  - Icon: ChevronRight.
                  - Shadow: "Rainbow" Glow (Multi-color backdrop blur) via pseudo-element.
                  - Layout: Now below text, whitespace-nowrap to prevent ugly wrapping.
                  - Added sm:mr-6 to pull it slightly left from the absolute edge.
                */}
                <div className="relative group/btn shrink-0 sm:mr-6">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-40 blur-lg transition-opacity duration-300 group-hover/btn:opacity-75" />
                  <Link
                    href={normalizeInternalHref(ctaHref)}
                    className="relative inline-flex w-full items-center justify-center rounded-full bg-[#A70909] px-10 py-5 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#900000] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#A70909]/30 sm:w-auto"
                  >
                    <span className="tracking-wide whitespace-nowrap">{ctaLabel}</span>
                    <ChevronRight className="ml-3 w-6 h-6 stroke-[3px] transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
