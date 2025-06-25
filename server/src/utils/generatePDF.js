const fs = require('fs');
const path = require('path');
const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');
const handlebars = require('handlebars');

const generatePDF = async (data, templateName) => {
  const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.html`);
  const templateHtml = fs.readFileSync(templatePath, 'utf-8');
  const compiledTemplate = handlebars.compile(templateHtml);
  const html = compiledTemplate(data);

  console.log("Launching Puppeteer/Chromium");

  const isRender = !!process.env.RENDER; // Render sets this environment variable automatically

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: isRender
      ?  chromium.executablePath()
      : undefined, // use local Chrome if not on Render
    headless: chromium.headless,
  });

  console.log("Chromium launched");

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();

  return { pdfBuffer };
};

module.exports = generatePDF;
