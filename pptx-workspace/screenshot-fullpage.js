const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const out = path.join(__dirname, 'screenshots');
fs.mkdirSync(out, { recursive: true });

(async () => {
    // Test at 1920x1080 (common large screen)
    const browser = await chromium.launch({ headless: true });

    // Test at 1536x864 (common laptop with scaling)
    const page = await browser.newPage({ viewport: { width: 1536, height: 864 } });
    await page.goto('https://neexios.github.io/christophe-de-margerie/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(5000);
    try { await page.click('text=Ouvrir le dossier', { timeout: 8000 }); } catch(e) {}
    await page.waitForTimeout(8000);

    // Take full page screenshot to see everything
    await page.screenshot({ path: path.join(out, 'fullpage-1536.png'), fullPage: true });
    console.log('Full page screenshot at 1536x864 done');

    // Get page dimensions info
    const info = await page.evaluate(() => {
        return {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            scrollHeight: document.documentElement.scrollHeight,
            scenes: Array.from(document.querySelectorAll('.scene[data-scene]')).map(s => ({
                id: s.id,
                offsetTop: s.offsetTop,
                offsetHeight: s.offsetHeight,
                scrollHeight: s.scrollHeight
            }))
        };
    });
    console.log(JSON.stringify(info, null, 2));

    await browser.close();
})();
