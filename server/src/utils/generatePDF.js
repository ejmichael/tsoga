const PDFDocument = require('pdfkit');
const path = require('path');

const generatePDF = (data) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    let buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve({ pdfBuffer });
    });

    // COLORS & FONTS
    const primaryColor = '#2C3E50';
    const accentColor = '#ffca01';
    const textColor = '#333';

    // LOGO & HEADER
    try {
      doc.image(path.join(__dirname, '../assets/tsoga-logo.png'), 50, 40, { width: 160 });
    } catch (err) {
      console.warn('Logo not found or failed to load:', err.message);
    }

    doc.moveDown(4); // Add spacing below the logo
    doc
      .fontSize(22)
      .fillColor(primaryColor)
      .text('Personalized Insurance Offer', { align: 'left' });

    doc.moveDown(1);

    // Greeting
    doc.fontSize(13).fillColor(textColor).text(`Hello ${data.firstName},`);
    doc.moveDown(0.5);
    doc.fontSize(12).text(
      `Thank you for your interest in our ${data.insuranceSubType} insurance offering. Below is your personalized product breakdown for ${data.subProduct || ''} in ${data.location}.`
    );
    doc.moveDown(1.5);

    // Helper function for sections
    const renderSection = (title, content) => {
      doc.fontSize(14).fillColor(accentColor).text(title, { underline: true });
      doc.moveDown(0.3);
      doc.fontSize(12).fillColor(textColor);
      if (Array.isArray(content)) {
        content.forEach(item => doc.text(`• ${item}`));
      } else {
        doc.text(content || 'N/A');
      }
      doc.moveDown(1);
    };

    // Render dynamic sections
    renderSection('Product Overview', [
      `Description: ${data.description || 'N/A'}`,
      `Who Is It For: ${data.whoIsItFor || 'N/A'}`
    ]);

    if (data.coverDetails?.length) renderSection('Cover Details', data.coverDetails);
    if (data.policyHighlights?.length) renderSection('Policy Highlights', data.policyHighlights);
    if (data.exclusions?.length) renderSection('Exclusions', data.exclusions);
    if (data.claimsProcess) renderSection('Claims Process', data.claimsProcess);
    if (data.excessInfo) renderSection('Excess Info', data.excessInfo);
    if (data.periodOfCover) renderSection('Period of Cover', data.periodOfCover);

    // Final message
    doc.fontSize(11).fillColor('#444').text(
      'If you have any questions or would like to speak with a consultant, our team is always here to assist!',
      { align: 'center' }
    );
    doc.moveDown(2);

    // FOOTER
    doc
      .fontSize(10)
      .fillColor(textColor)
      .text('Tsoga Afrika Insurance Brokers (PTY) Ltd is an authorised Financial Services Provider', {
        align: 'center'
      });
    doc
      .fontSize(10)
      .text('FSP License Number: 49909', { align: 'center' });

    doc
      .fontSize(10)
      .fillColor('#7b3f00')
      .text('"...after all, Insurance is a STOKVEL™"', {
        align: 'center',
        oblique: true
      });

    // End PDF
    doc.end();
  });
};

module.exports = generatePDF;
