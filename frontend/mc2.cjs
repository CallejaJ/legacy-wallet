const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 320, height: 700 } });
  await page.goto('http://localhost:5174/');
  await page.waitForTimeout(1500);
  await page.getByText('Registrar Herencia', { exact: true }).click();
  await page.waitForTimeout(800);
  const result = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('*').forEach(el => {
      if (el.scrollWidth > document.documentElement.clientWidth + 2) {
        out.push({tag: el.tagName, cls: el.className.toString().slice(0,60), sw: el.scrollWidth});
      }
    });
    return { docW: document.documentElement.scrollWidth, winW: window.innerWidth, wide: out.slice(0,20) };
  });
  console.log(JSON.stringify(result, null, 1));
  await page.screenshot({ path: 'mc2.png', fullPage: true });
  await browser.close();
})();
