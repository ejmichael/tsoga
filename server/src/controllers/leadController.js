const express = require('express');
const generatePDF = require('../utils/generatePDF');
const { sendEmailWithPDF } = require('../utils/sendEmail');
const fs = require('fs');
const Lead = require('../models/leadModel');
const pdfProductInfoModel = require('../models/pdfProductInfoModel');

const leadSubmitForm = async (req, res) => {
  try {
    const { 
      category,
     } = req.params;
     
     const {
      firstName,
      lastName,
      emailAddress,
      location,
      insuranceType,
      insuranceSubType
     } = req.body;

    const productInfo = await pdfProductInfoModel.findOne({ 
      category: category,
      name: "Glass Cover",
    });

    if (!productInfo) {
      return res.status(404).json({ message: 'Product information not found.' });
    }

    console.log('Form submitted to Backend');

    const pdfData = {
      //form data
      firstName,
      lastName ,
      emailAddress,
      location,
      insuranceType,
      insuranceSubType,

      // Product info fields
      description: productInfo.description,
      coverDetails: productInfo.coverDetails,
      whoIsItFor: productInfo.whoIsItFor,
      policyHighlights: productInfo.policyHighlights,
      exclusions: productInfo.exclusions,
      claimsProcess: productInfo.claimsProcess,
      excessInfo: productInfo.excessInfo,
      periodOfCover: productInfo.periodOfCover
    };

    const newLead = new Lead({
      firstName,
      lastName ,
      emailAddress,
      location,
      insuranceType,
      insuranceSubType,
    });
    
    await newLead.save()

    // Generate the PDF
    const { pdfBuffer, filePath } = await generatePDF(pdfData, 'insurance-offer');

    // Send email with PDF attached
    await sendEmailWithPDF(
      pdfData.emailAddress,
      'Your Personalized Insurance Offer',
      `Hi ${pdfData.firstName},\n\nPlease find your personalized insurance offer attached.`,
      pdfBuffer,
      'insurance-offer.pdf'
    );

    res.status(200).json({ message: 'Lead captured and PDF emailed successfully.', filePath });
  } catch (error) {
    console.error('Error handling lead submission:', error);
    res.status(500).json({ message: 'Failed to process lead submission.' });
  }
};

module.exports = { leadSubmitForm };
