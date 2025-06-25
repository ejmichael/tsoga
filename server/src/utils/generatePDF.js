const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');
const handlebars = require('handlebars');

const generatePDF = async (data, templateName) => {
  const { default: chromium } = await import('@sparticuz/chromium');

  const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.html`);
  const templateHtml = fs.readFileSync(templatePath, 'utf-8');
  const compiledTemplate = handlebars.compile(templateHtml);
  const html = compiledTemplate(data);

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: chromium.path,
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();

  return { pdfBuffer };
};

module.exports = generatePDF;
