const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const out = path.join(__dirname, 'screenshots', 'check');
fs.mkdirSync(out, { recursive: true });

(async () => {
    const browser = await chromium.launch({ headless: true });
    // Test at multiple sizes
    const sizes = [
        { w: 1920, h: 1080, name: '1080p' },
        { w: 1536, h: 864, name: '1536' },
        { w: 1440, h: 900, name: '1440' },
    ];

    for (const s of sizes) {
        const page = await browser.newPage({ viewport: { width: s.w, height: s.h } });
        await page.goto('https://neexios.github.io/christophe-de-margerie/', { waitUntil: 'networkidle' });
        await page.waitForTimeout(4500);
        try { await page.click('text=Ouvrir le dossier', { timeout: 8000 }); } catch(e) {}
        await page.waitForTimeout(9000);

        // Screenshot each scene by scrolling slowly
        const scenes = ['scene-1','scene-2','scene-3','scene-4','scene-5','scene-6','scene-7','scene-end'];
        for (const sid of scenes) {
            await page.evaluate((id) => document.getElementById(id)?.scrollIntoView({behavior:'instant'}), sid);
            await page.waitForTimeout(1500);
            await page.screenshot({ path: path.join(out, `${s.name}-${sid}.png`) });
        }
        // Also scroll to middle of scene-2 (which is long)
        await page.evaluate(() => {
            const el = document.getElementById('scene-2');
            if (el) window.scrollTo(0, el.offsetTop + el.offsetHeight/2);
        });
        await page.waitForTimeout(1000);
        await page.screenshot({ path: path.join(out, `${s.name}-scene-2-mid.png`) });

        await page.close();
        console.log(s.name + ' done');
    }
    await browser.close();
})();
