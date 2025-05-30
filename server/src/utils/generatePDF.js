const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const handlebars = require('handlebars');

const generatePDF = async (data, templateName) => {
  const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.html`);
  const templateHtml = fs.readFileSync(templatePath, 'utf-8');
  const compiledTemplate = handlebars.compile(templateHtml);
  const html = compiledTemplate(data);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const downloadsDir = path.join(__dirname, '..', 'downloads');

  // ✅ Ensure 'downloads' folder exists
  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir);
  }

  const filePath = path.join(downloadsDir, `${Date.now()}-${templateName}.pdf`);

  const pdfBuffer = await page.pdf({ format: 'A4', path: filePath });
  await browser.close();

  return { pdfBuffer, filePath };
};

module.exports = generatePDF;
