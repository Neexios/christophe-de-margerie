const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const out = path.join(__dirname, 'screenshots');
fs.mkdirSync(out, { recursive: true });

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto('https://neexios.github.io/christophe-de-margerie/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(5000);
    try { await page.click('text=Ouvrir le dossier', { timeout: 8000 }); } catch(e) {}
    await page.waitForTimeout(8000);

    const scenes = ['scene-1','scene-2','scene-3','scene-4','scene-5','scene-6','scene-7','scene-end'];
    for (const sid of scenes) {
        await page.evaluate((s) => document.getElementById(s)?.scrollIntoView({behavior:'instant'}), sid);
        await page.waitForTimeout(2000);
        await page.screenshot({ path: path.join(out, `1080-${sid}.png`) });
        console.log(sid + ' done');
    }

    // Also get scene dimensions
    const info = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.scene[data-scene]')).map(s => ({
            id: s.id, height: s.offsetHeight, scrollH: s.scrollHeight
        }));
    });
    console.log(JSON.stringify(info));

    await browser.close();
})();
