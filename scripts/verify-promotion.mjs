import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\GetzInsomnia\\.gemini\\antigravity\\brain\\75f3b5f6-429c-47a7-b2e2-40529a36e360';
const SCREENSHOT_DIR = path.join(ARTIFACT_DIR, 'verification_images');

if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const LOCALES = ['th', 'en', 'de', 'fr', 'nl', 'it', 'ja', 'ko', 'zh-Hans', 'zh-Hant', 'hi', 'ta', 'ms'];
const BREAKPOINTS = [390, 430, 768, 1024, 1280, 1440];

async function verify() {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none']
    });

    const results = {};

    for (const locale of LOCALES) {
        results[locale] = {};
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        try {
            const url = `http://localhost:3000/${locale === 'en' ? '' : locale}`;
            console.log(`Navigating to ${url}`);
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

            try {
                await page.waitForSelector('#promotion', { timeout: 5000 });
            } catch (e) {
                console.log('Promotion section selector timed out.');
            }

            for (const width of BREAKPOINTS) {
                await page.setViewport({ width, height: 1000 });
                await new Promise(r => setTimeout(r, 500));

                const metrics = await page.evaluate(() => {
                    const section = document.querySelector('#promotion');
                    if (!section) return null;

                    const fireIcon = section.querySelector('.fa-fire');
                    if (!fireIcon) return null;

                    const badge = fireIcon.closest('.relative.inline-flex');
                    if (!badge) return null;

                    // badge.parentElement is the flex container
                    const metaRow = badge.parentElement;

                    // First child is the span wrapping badge? Wait.
                    // In the code: 
                    // <div ...> (metaRow)
                    //   <span ...> (Badge outer) -> contains <span relative inline-flex> (Badge inner)
                    //   <div ...> (Comp text)
                    // So 'badge' variable above is the inner span.
                    // badge.parentElement is the outer span? Or the metaRow?
                    // Let's check the code:
                    // <span className="relative inline-flex items-center gap-2 ...">
                    //   <span><FontAwesomeIcon ... /></span>
                    //   {badge}
                    // </span>
                    // This span is a direct child of the metaRow div!
                    // So badge variable IS the direct child.
                    // So metaRow = badge.parentElement. Correct.

                    const compTextDiv = metaRow.children[1];
                    if (!compTextDiv) return { error: "No comp text found" };

                    const badgeRect = badge.getBoundingClientRect();
                    const compRect = compTextDiv.getBoundingClientRect();

                    const computedStyle = window.getComputedStyle(metaRow);
                    const gapX = parseFloat(computedStyle.columnGap || computedStyle.gap || '0');

                    const isWrapped = Math.abs(badgeRect.top - compRect.top) > 10;
                    const visualGapX = isWrapped ? 0 : (compRect.left - badgeRect.right);
                    const visualGapY = isWrapped ? (compRect.top - badgeRect.bottom) : 0;

                    // Centering Check for CTA
                    const ctaBtn = section.querySelector('a[href*="contact"]') || section.querySelector('.group\\/btn a');
                    let ctaCentered = false;
                    let ctaDiff = 0;
                    let ctaOverflow = false;

                    if (ctaBtn) {
                        const btnRect = ctaBtn.getBoundingClientRect();
                        const btnCenter = btnRect.left + btnRect.width / 2;
                        const mainRec = section.querySelector('.max-w-7xl').getBoundingClientRect();
                        const effectiveCenter = mainRec.left + mainRec.width / 2;
                        ctaDiff = Math.abs(btnCenter - effectiveCenter);

                        // Check overflow
                        const spanText = ctaBtn.querySelector('span');
                        if (spanText) {
                            ctaOverflow = spanText.scrollWidth > spanText.offsetWidth + 2; // Tolerance
                        }
                    }

                    // Check Header Overflow
                    const header = section.querySelector('h2');
                    let headerOverflow = false;
                    if (header) {
                        headerOverflow = header.scrollWidth > header.clientWidth;
                    }

                    return { visualGapX, visualGapY, isWrapped, ctaDiff, gapX, ctaOverflow, headerOverflow };
                });

                const statusStr = metrics ?
                    `Wrapped: ${metrics.isWrapped}, GapX: ${metrics.visualGapX?.toFixed(1)}px, CTA Diff: ${metrics.ctaDiff?.toFixed(1)}px, CTA Overflow: ${metrics.ctaOverflow}, Header Overflow: ${metrics.headerOverflow}` :
                    "Failed to measure";

                const filename = `${locale}-${width}.png`;
                await page.screenshot({ path: path.join(SCREENSHOT_DIR, filename), clip: { x: 0, y: 0, width, height: 1000 } });
                console.log(`[${locale} ${width}px] ${statusStr}`);

                results[locale][width] = { metrics, status: statusStr, screenshot: filename };
            }
        } catch (e) {
            console.error(`Error ${locale}:`, e);
        } finally {
            await page.close();
        }
    }

    await browser.close();
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'verification_report.json'), JSON.stringify(results, null, 2));
}

verify();
