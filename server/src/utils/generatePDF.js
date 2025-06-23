const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core'); // use core
const handlebars = require('handlebars');

const generatePDF = async (data, templateName) => {
  const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.html`);
  const templateHtml = fs.readFileSync(templatePath, 'utf-8');
  const compiledTemplate = handlebars.compile(templateHtml);
  const html = compiledTemplate(data);

  const chromePath = process.env.CHROME_PATH || '/usr/bin/google-chrome-stable';
  console.log('Using Chrome executable:', chromePath);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      executablePath: chromePath,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    console.log('Chromium launched successfully');
  } catch (err) {
    console.error('Error launching Chromium:', err);
    throw err;
  }

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const downloadsDir = path.join(__dirname, '..', 'downloads');
  if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir);

  const filePath = path.join(downloadsDir, `${Date.now()}-${templateName}.pdf`);
  const pdfBuffer = await page.pdf({ format: 'A4', path: filePath });
  await browser.close();

  return { pdfBuffer, filePath };
};

module.exports = generatePDF;
