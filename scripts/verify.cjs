require("module").Module._initPaths();

const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require("playwright");
const { PDFDocument } = require("pdf-lib");

const APP_URL = process.env.APP_URL || "http://127.0.0.1:5174";
const CHROME_PATH = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: CHROME_PATH,
  });
  const context = await browser.newContext({
    acceptDownloads: true,
    viewport: { width: 1440, height: 1100 },
  });
  const page = await context.newPage();
  const browserMessages = [];
  page.on("console", (message) => browserMessages.push(`${message.type()}: ${message.text()}`));
  page.on("pageerror", (error) => browserMessages.push(`pageerror: ${error.message}`));

  await page.goto(APP_URL, { waitUntil: "networkidle" });

  const nameField = page.locator('[name="Name"]');
  const healthField = page.locator('[name="Health"]');
  const strengthCheck = page.locator('[name="Strength_Prof_1"]');

  console.log(`title=${await page.title()}`);
  console.log(`fields=${await page.locator("[data-field-name]").count()}`);
  console.log(`pages=${await page.locator(".sheet-page").count()}`);
  console.log(`nameField=${await nameField.count()}`);
  console.log(`healthField=${await healthField.count()}`);
  console.log(`strengthCheck=${await strengthCheck.count()}`);

  await nameField.fill("Astra Vale");
  await healthField.fill("18");
  await strengthCheck.check();
  console.log(`status=${await page.locator("#fieldCount").textContent()}`);

  console.log(`pdfLib=${await page.evaluate(() => Boolean(window.PDFLib))}`);
  const downloadPromise = page.waitForEvent("download", { timeout: 15000 });
  await page.locator("#downloadPdf").click();
  const download = await downloadPromise.catch(async (error) => {
    console.log(`saveState=${await page.locator("#saveState").textContent()}`);
    if (browserMessages.length > 0) {
      console.log(`browserMessages=${browserMessages.join(" | ")}`);
    }
    throw error;
  });
  const target = path.join(process.cwd(), ".winterfall-test-output.pdf");
  await download.saveAs(target);

  const pdfDoc = await PDFDocument.load(await fs.readFile(target));
  console.log(`filename=${download.suggestedFilename()}`);
  console.log(`pdfPages=${pdfDoc.getPageCount()}`);
  if (browserMessages.length > 0) {
    console.log(`browserMessages=${browserMessages.join(" | ")}`);
  }

  await fs.unlink(target);
  await browser.close();
})().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
