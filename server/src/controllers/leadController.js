const express = require('express');
const generatePDF = require('../utils/generatePDF');
const { sendEmailWithPDF, sendLeadInfo } = require('../utils/sendEmail');
const fs = require('fs');
const Lead = require('../models/leadModel');
const pdfProductInfoModel = require('../models/pdfProductInfoModel');

const leadSubmitForm = async (req, res) => {
  try {
    const { 
      type      
     } = req.params;

     console.log(type);
     
     
     const {
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      location,
      insuranceType,
      insuranceSubType,
      note
     } = req.body;

     console.log({
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      location,
      insuranceType,
      insuranceSubType, 
      note
    })

    const productInfo = await pdfProductInfoModel.findOne({ 
      category: type,
      name: insuranceSubType,
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
      phoneNumber,
      location,
      insuranceType,
      insuranceSubType,
      note
    });
    
    const savedLead = await newLead.save();

    if(savedLead) {
      await sendLeadInfo(
        'ethanj.michael03@gmail.com',
        // 'info@tsogainsure.com',
        'New Website Lead',
        `Hi Tsoga Team,\n\n New lead: \n Name: ${firstName} ${lastName} \n Phone: ${phoneNumber} \n Email: ${emailAddress} \n Insurance Type: ${insuranceType} \n Insurance Sub-type: ${insuranceSubType} \n Note: ${note}`
      )
    }


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

    // await sendLeadInfo(
    //   emailAddress,
    //   `${firstName}, thanks for reaching out`,
    //   `Hi ${firstName},\n\n We'll be in touch about your ${insuranceType},  ${insuranceSubType} quote. \n Thanks, \n\n Tsoga team.`
    // )

    res.status(200).json({ message: 'Lead captured and PDF emailed successfully.' });
  } catch (error) {
    console.error('Error handling lead submission:', error);
    res.status(500).json({ message: 'Failed to process lead submission.' });
  }
};

module.exports = { leadSubmitForm };
