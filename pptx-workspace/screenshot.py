from playwright.sync_api import sync_playwright
import os

out = r"c:\Users\neoli\OneDrive\Desktop\Workspace-IA\Christophe De Margerie\pptx-workspace\screenshots"
os.makedirs(out, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1366, "height": 768})
    page.goto("https://neexios.github.io/christophe-de-margerie/", wait_until="networkidle")

    # Screenshot the loading/intro screen
    page.screenshot(path=os.path.join(out, "01-intro.png"))

    # Click "Ouvrir le dossier" button
    page.wait_for_timeout(4000)  # wait for loading screen
    try:
        page.click("text=Ouvrir le dossier", timeout=10000)
    except:
        # Maybe loading screen still visible, click through it
        page.click("body")

    page.wait_for_timeout(6000)  # wait for dossier + newspapers animations

    # Screenshot scene 1
    page.screenshot(path=os.path.join(out, "02-scene1.png"))

    # Scroll through each scene and screenshot
    scenes = ["scene-1", "scene-2", "scene-3", "scene-4", "scene-5", "scene-6", "scene-7", "scene-end"]
    for i, sid in enumerate(scenes):
        page.evaluate(f'document.getElementById("{sid}")?.scrollIntoView({{behavior: "instant"}})')
        page.wait_for_timeout(1500)
        page.screenshot(path=os.path.join(out, f"{i+3:02d}-{sid}.png"))

    browser.close()
    print("Screenshots saved!")
