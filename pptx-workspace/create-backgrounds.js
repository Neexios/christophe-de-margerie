const sharp = require('sharp');
const path = require('path');

async function createBg(name, svg) {
    await sharp(Buffer.from(svg)).png().toFile(path.join(__dirname, 'slides', name));
}

async function main() {
    // Dark background with subtle gradient
    await createBg('bg-dark.png', `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540">
        <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0C0C14"/>
            <stop offset="100%" style="stop-color:#1a1a2e"/>
        </linearGradient></defs>
        <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>`);

    // Red accent background (for accident/danger slides)
    await createBg('bg-red.png', `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540">
        <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0C0C14"/>
            <stop offset="50%" style="stop-color:#1a0a0a"/>
            <stop offset="100%" style="stop-color:#0C0C14"/>
        </linearGradient></defs>
        <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>`);

    // Gold accent background (for conclusion)
    await createBg('bg-gold.png', `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540">
        <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0C0C14"/>
            <stop offset="50%" style="stop-color:#1a1508"/>
            <stop offset="100%" style="stop-color:#0C0C14"/>
        </linearGradient></defs>
        <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>`);

    console.log('Backgrounds created.');
}

main().catch(console.error);
