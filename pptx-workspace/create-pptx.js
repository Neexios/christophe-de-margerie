const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');
const html2pptx = require('C:/Users/neoli/.claude/skills/presentations/scripts/html2pptx.js');

async function main() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Neexios';
    pptx.title = 'Christophe de Margerie — Enquête IE';

    const slideFiles = [
        'slides/slide01-title.html',
        'slides/slide02-bigmoustache.html',
        'slides/slide03-tensions.html',
        'slides/slide04-accident.html',
        'slides/slide05-cuibono.html',
        'slides/slide06-infowar.html',
        'slides/slide07-bilanIE.html',
        'slides/slide08-conclusion.html',
        'slides/slide09-evolution.html',
        'slides/slide10-end.html'
    ];

    for (const s of slideFiles) {
        const fullPath = path.resolve(__dirname, s);
        console.log('Processing:', s);

        // Detect background image from HTML
        const htmlContent = fs.readFileSync(fullPath, 'utf8');
        const bgMatch = htmlContent.match(/background-image:\s*url\(['"]?([^'")\s]+)['"]?\)/);
        let bgData = null;
        if (bgMatch) {
            const bgFile = bgMatch[1];
            const bgPath = path.resolve(path.dirname(fullPath), bgFile);
            if (fs.existsSync(bgPath)) {
                bgData = fs.readFileSync(bgPath).toString('base64');
            }
        }

        const result = await html2pptx(fullPath, pptx);

        // Fix background: remove broken file:// path entry and replace with base64
        if (bgData && result.slide) {
            // Remove old broken background media entry
            const oldLen = result.slide._relsMedia.length;
            result.slide._relsMedia = result.slide._relsMedia.filter(r => {
                // Keep entries that are not the broken background image
                if (r.data === null && r.path && (r.path.startsWith('/') || r.path.includes('%20'))) {
                    return false; // Remove broken path
                }
                return true;
            });
            // Set new background with base64 data
            result.slide.background = { data: `image/png;base64,${bgData}` };
        }
    }

    const outPath = path.resolve(__dirname, '..', 'Christophe-De-Margerie.pptx');
    await pptx.writeFile({ fileName: outPath });
    console.log('DONE! Output:', outPath);
}

main().catch(console.error);
