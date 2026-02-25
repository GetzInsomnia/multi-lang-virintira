import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const LOCALES = ['th', 'en', 'de', 'fr', 'nl', 'it', 'ja', 'ko', 'zh-Hans', 'zh-Hant', 'hi', 'ta', 'ms'];
const BREAKPOINTS = [390, 412, 430, 768, 1024, 1280, 1440];

async function verify() {
    console.log("Launching browser for Alignment Check...");
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none']
    });

    const results = {};

    for (const locale of LOCALES) {
        results[locale] = {};
        const page = await browser.newPage();
        // Set a realistic user agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        try {
            const url = `http://localhost:3000/${locale === 'en' ? '' : locale}`;
            console.log(`Checking ${locale} at ${url}`);
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

            for (const width of BREAKPOINTS) {
                await page.setViewport({ width, height: 800 });
                // Wait for layout stability/resize
                await new Promise(r => setTimeout(r, 500));

                const metrics = await page.evaluate(() => {
                    const compBlock = document.querySelector('[data-testid="complimentary-block"]');
                    const metaRow = document.querySelector('[data-testid="meta-row"]'); // The text-center container
                    const viewportWidth = window.innerWidth;

                    // For CTA Check
                    // The CTA is likely in a different container, let's try to find it generically
                    const ctaButton = document.querySelector('a[href*="promotion"]');

                    if (!compBlock) return { error: "Complimentary block not found" };

                    const compRect = compBlock.getBoundingClientRect();

                    // Container center: For mobile, it's usually the viewport center or the meta-row center.
                    // Since we used mx-auto on meta-row, let's use viewport center for "Macro Centering" check as requested.
                    // Or use the metaRow's center if it's full width.
                    // The text-center parent might be full width or fit-content. Let's measure it.
                    let containerCenterX = viewportWidth / 2;
                    if (metaRow) {
                        const metaRect = metaRow.getBoundingClientRect();
                        // If metaRow is not full width, use its center? 
                        // Actually, the requirement is "container center" or "viewport center".
                        // Since metaRow has mx-auto, its center SHOULD be viewport center.
                        // Let's use viewport center as the definitive "Screen Center" reference.
                        containerCenterX = viewportWidth / 2;
                    }

                    const compCenterX = compRect.left + compRect.width / 2;
                    const compDiff = Math.abs(compCenterX - containerCenterX);

                    let ctaDiff = null;
                    if (ctaButton) {
                        const ctaRect = ctaButton.getBoundingClientRect();
                        const ctaCenterX = ctaRect.left + ctaRect.width / 2;
                        ctaDiff = Math.abs(ctaCenterX - containerCenterX);
                    }

                    // Check if wrapped (2 lines)
                    // Heuristic: Height > LineHeight (~20-24px). If height > 30px, likely wrapped.
                    const isWrapped = compRect.height > 30;

                    return {
                        compDiff,
                        ctaDiff,
                        isWrapped,
                        width: compRect.width,
                        left: compRect.left,
                        viewportWidth
                    };
                });

                results[locale][width] = metrics;

                if (width <= 430 || (locale === 'en' && width === 1440)) {
                    await page.screenshot({ path: `alignment_${locale}_${width}.png` });
                }
            }
        } catch (e) {
            console.error(`Error checking ${locale}:`, e);
            results[locale].error = e.message;
        } finally {
            await page.close();
        }
    }

    fs.writeFileSync('alignment_report.json', JSON.stringify(results, null, 2));
    await browser.close();
    console.log("Verification complete. Report saved to alignment_report.json");
}

verify();
