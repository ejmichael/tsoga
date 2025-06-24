const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const handlebars = require('handlebars');

const generatePDF = async (data, templateName) => {
  // Load and compile the HTML template with Handlebars
  const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.html`);
  const templateHtml = fs.readFileSync(templatePath, 'utf-8');
  const compiledTemplate = handlebars.compile(templateHtml);
  const html = compiledTemplate(data);


  // Launch Chromium with Render-compatible flags
  console.log("launching puppeteer");
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  console.log("Puppeteer launched");
  

  const page = await browser.newPage();

  // Set the page content to the compiled HTML
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Generate PDF as a buffer (without saving to disk)
  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();

  // Return only the PDF buffer now (no file path)
  return { pdfBuffer };
};

module.exports = generatePDF;
