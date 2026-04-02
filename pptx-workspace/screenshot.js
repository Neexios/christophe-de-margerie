const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const out = path.join(__dirname, 'screenshots');
fs.mkdirSync(out, { recursive: true });

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
    await page.goto('https://neexios.github.io/christophe-de-margerie/', { waitUntil: 'networkidle' });

    // Screenshot loading/intro
    await page.screenshot({ path: path.join(out, '01-intro.png') });
    console.log('01-intro done');

    // Wait for loading screen to finish, then click button
    await page.waitForTimeout(5000);
    try {
        await page.click('text=Ouvrir le dossier', { timeout: 8000 });
    } catch (e) {
        console.log('Could not find button, clicking body');
        await page.click('body');
    }

    // Wait for dossier + newspaper animations
    await page.waitForTimeout(8000);
    await page.screenshot({ path: path.join(out, '02-after-intro.png') });
    console.log('02-after-intro done');

    // Scroll through each scene
    const scenes = ['scene-1', 'scene-2', 'scene-3', 'scene-4', 'scene-5', 'scene-6', 'scene-7', 'scene-end'];
    for (let i = 0; i < scenes.length; i++) {
        await page.evaluate((sid) => {
            const el = document.getElementById(sid);
            if (el) el.scrollIntoView({ behavior: 'instant' });
        }, scenes[i]);
        await page.waitForTimeout(2000);
        const num = String(i + 3).padStart(2, '0');
        await page.screenshot({ path: path.join(out, `${num}-${scenes[i]}.png`) });
        console.log(`${num}-${scenes[i]} done`);
    }

    await browser.close();
    console.log('All screenshots saved!');
})();
