const PDFDocument = require('pdfkit');
const path = require('path');

const generatePDF = (data) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    let buffers = [];

    // Collect the PDF chunks in buffers array
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve({ pdfBuffer });
    });

    // HEADER - Logo + Title
    doc.image(path.join(__dirname, '../assets/tsoga-logo.png'), 50, 45, { width: 100 });
    doc.fontSize(20).fillColor('#2C3E50').text(`Personalized Insurance Offer`, 160, 65);

    // Greeting
    doc.moveDown();
    doc.fontSize(14).fillColor('#000').text(`Hello ${data.firstName},`, { continued: false });
    doc.moveDown();

    // Intro
    doc.fontSize(12).text(
      `Thank you for your interest in our ${data.insuranceSubType} insurance offering. Below is your personalized product breakdown for ${data.subProduct || ''} in ${data.location}.`
    );
    doc.moveDown();

    // Section: Product Overview
    doc.fontSize(16).fillColor('#ffca01').text('Product Overview', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).fillColor('#000').text(`Description: ${data.description || 'N/A'}`);
    doc.text(`Who Is It For: ${data.whoIsItFor || 'N/A'}`);
    doc.moveDown();

    // Section: Cover Details
    if (data.coverDetails && data.coverDetails.length) {
      doc.fontSize(16).fillColor('#ffca01').text('Cover Details', { underline: true });
      doc.moveDown(0.5);
      data.coverDetails.forEach(item => {
        doc.fontSize(12).fillColor('#000').text(`• ${item}`);
      });
      doc.moveDown();
    }

    // Section: Policy Highlights
    if (data.policyHighlights && data.policyHighlights.length) {
      doc.fontSize(16).fillColor('#ffca01').text('Policy Highlights', { underline: true });
      doc.moveDown(0.5);
      data.policyHighlights.forEach(item => {
        doc.fontSize(12).fillColor('#000').text(`• ${item}`);
      });
      doc.moveDown();
    }

    // Section: Exclusions
    if (data.exclusions && data.exclusions.length) {
      doc.fontSize(16).fillColor('#ffca01').text('Exclusions', { underline: true });
      doc.moveDown(0.5);
      data.exclusions.forEach(item => {
        doc.fontSize(12).fillColor('#000').text(`• ${item}`);
      });
      doc.moveDown();
    }

    // Section: Claims Process
    if (data.claimsProcess) {
      doc.fontSize(16).fillColor('#ffca01').text('Claims Process', { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(12).fillColor('#000').text(data.claimsProcess);
      doc.moveDown();
    }

    // Section: Excess Info
    if (data.excessInfo) {
      doc.fontSize(16).fillColor('#ffca01').text('Excess Info', { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(12).fillColor('#000').text(data.excessInfo);
      doc.moveDown();
    }

    // Section: Period of Cover
    if (data.periodOfCover) {
      doc.fontSize(16).fillColor('#ffca01').text('Period of Cover', { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(12).fillColor('#000').text(data.periodOfCover);
      doc.moveDown();
    }

    // Footer note
    doc.moveDown();
    doc.fontSize(12).fillColor('#333').text(
      'If you have any questions or would like to speak with a consultant, our team is always here to assist!',
      { align: 'center' }
    );

    // Finalize PDF and end stream
    doc.end();
  });
};

module.exports = generatePDF;
