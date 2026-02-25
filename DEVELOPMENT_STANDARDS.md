# Development Standards & Guidelines

This document serves as the "Constitution" for the Virintira project. All code modifications, refactoring, and new features must strictly adhere to these standards to prevent regression and ensure a premium user experience.

## 1. Performance (Core Web Vitals)
**Goal:** Green scores (90+) in Lighthouse for LCP, CLS, and FID/INP.

### 1.1 Largest Contentful Paint (LCP)
- **Hero Images:** The main hero image MUST use `next/image` with `priority={true}` and appropriate `sizes` based on breakpoints.
- **Preloading:** Critical assets (fonts, hero images) must be preloaded.
- **Format:** Use `content-visibility: auto` for below-the-fold content if complex.

### 1.2 Cumulative Layout Shift (CLS)
- **Dimensions:** All images and video elements MUST have explicit `width` and `height` (or aspect ratio) reserved before loading.
- **Dynamic Content:** Containers for dynamic text (e.g., Typewriter) MUST have a fixed minimum height (`min-h-[...]`) to prevent jumping when text appears.
- **Fonts:** Use `font-display: swap` or `optional` to prevent FOIT (Flash of Invisible Text) re-layout.

## 2. Accessibility (A11y) & SEO
**Goal:** WCAG 2.1 AA Compliance.

### 2.1 Color Contrast
- **Text:** Normal text must have a contrast ratio of at least **4.5:1** against the background. Large text (18pt+ or 14pt+ bold) must be **3:1**.
- **Icons:** Interactive icons must have a contrast ratio of **3:1**.
- **Strict Rule:** For `#A70909` (Red), ensure background is pure white or very light gray.
- **Brand Colors:** Use official brand colors for recognition, even if they slightly miss AA contrast.
    - **Line:** Use **`#06C755`** (Official).
    - **WhatsApp:** Use **`#25D366`** (Official).

### 2.2 Semantic HTML & ARIA
- **Buttons vs Links:** Use `<button>` for actions (click), `<a>` for navigation.
- **Icon-Only Buttons:** MUST have `aria-label` describing the action (e.g., `aria-label="Open Chat"`).
- **Images:** All decorative images must have `alt=""` or `aria-hidden="true"`. Information images must have descriptive `alt`.
- **Focus Management:** Modals/Popovers (like CTA Reveal) must trap focus or manage focus return.

## 3. UI/UX & Responsive Design
**Goal:** Premium, Fluid, "It Just Works".

### 3.0 Better than Original
- **Premium Feel:** The goal is not just to copy the reference, but to improve it. Add smoother animations, better micro-interactions, and more refined spacing.
- **Modern Stack:** Leverage Next.js 14 and Framer Motion to create experiences that feel native and app-like.

### 3.1 Mobile First
- Design for mobile (320px+) first, then scale up using `sm:`, `md:`, `lg:`.
- **Touch Targets:** Interactive elements must be at least **44x44px** (clickable area).
- **Safe Area:** Respect `padding-safe` `pb-safe` for iPhone notches.

### 3.2 Animation Physics
- **No Drift:** Animations inside expanding containers MUST use `layout="position"` carefully or use **Isolation Wrappers** to prevent coordinate drift.
- **Direction:** Slide/Fade directions must be consistent (e.g., Vertical Only for CTA).
- **Reduced Motion:** Respect `prefers-reduced-motion` using `motion-reduce:` variants.

### 3.3 International Typography (CJK & Agglutinative)
- **CJK Line Breaks (JA, ZH):** Never rely solely on generic `text-balance` or `break-keep` CSS as Chromium lacks the cultural dictionary to identify Japanese/Chinese compound words.
  - **Standard:** Use `next-intl`'s Rich Text formatting (`t.rich()`) to natively bind semantic concepts. 
  - Wrap unbreakable phrases in JSON with XML chunks (e.g., `<nw>一站式服務</nw>`) and map `<nw>` to `<span className="whitespace-nowrap inline-block">` in React. This explicitly forces Webkit to flow text *around*, not *through*, native semantic boundaries.
  - **SEO Protection:** Always strictly sanitize JSON-LD metadata strings using a `stripTags()` regex over `t.raw()` to prevent XML bleed into the backend layer.
- **Long-Word Languages (Tamil/German):** Ensure `h1` and `h2` elements utilize fluid `text-[clamp(...)]` constraints with minimums low enough (e.g., `1.7rem` instead of `2.5rem`) to prevent massive agglutinative words (like *`நம்பிக்கையுடன்`*) from forcefully wrapping and breaking mobile (320px) viewport barriers.

## 4. Regression Testing & Impact Analysis
**Before merging any code:**
1.  **Check Neighbors:** Does changing this component affect siblings? (e.g., changing button width breaking the title layout).
2.  **Check Languages:** Does this work in **Tamil (Longest)**? **German (Long Words)**? **Thai (Tall Lines)**?
3.  **Check Devices:** Verify on Mobile (Stack), Tablet (Hybrid), Desktop (Wide).

## 5. Global Configuration Instructions for Agent
*To ensure AI follows these rules, add this to the custom instructions or `GEMINI.md`:*
> "Prioritize `DEVELOPMENT_STANDARDS.md`. Before proposing code, simulate the change against these standards. If a change risks LCP/CLS or A11y, flag it immediately. Explicitly check for 'Drift' in Framer Motion animations."
