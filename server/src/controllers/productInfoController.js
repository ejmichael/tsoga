const express = require('express')
const PdfProductInfo = require('../models/pdfProductInfoModel')

const insuranceProducts = [
    {
      name: "Office Contents",
      description: "Insurance for contents within an office environment including furniture, equipment, and supplies.",
      coverDetails: [
        "Fire damage",
        "Theft",
        "Accidental damage",
        "Water damage",
        "Power surges"
      ],
      whoIsItFor: "Ideal for service-based businesses operating from an office.",
      policyHighlights: [
        "Flexible excess options",
        "Covers essential office items",
        "Annual renewable cover"
      ],
      exclusions: [
        "Normal wear and tear",
        "Depreciation",
        "Mechanical breakdown"
      ],
      claimsProcess: "Report incident, submit inventory list, claim form, and proof of purchase or valuation.",
      excessInfo: "R1,000 - R5,000 depending on asset value.",
      periodOfCover: "Annual renewable cover.",
      category: "commercial"
    },
    {
      name: "Glass Cover",
      description: "Protection for internal and external glass within the insured premises.",
      coverDetails: [
        "Breakage of fixed glass due to accidental or malicious damage"
      ],
      whoIsItFor: "Retailers, restaurants, and any business with glass installations.",
      policyHighlights: [
        "Includes shopfronts and internal glass",
        "Optional signage and mirror cover",
        "Quick claims turnaround"
      ],
      exclusions: [
        "Scratches",
        "Chipping not resulting in breakage",
        "Decorative items"
      ],
      claimsProcess: "Photographic evidence and invoice for repair/replacement required.",
      excessInfo: "Typically R500 to R1,500 depending on size and type of glass.",
      periodOfCover: "12-month term, renewable annually.",
      category: "commercial"
    },
    {
      name: "Money Insurance",
      description: "Covers loss of money on premises, in transit, or with authorized personnel.",
      coverDetails: [
        "Theft",
        "Robbery",
        "Accidental loss of money under insured conditions"
      ],
      whoIsItFor: "Essential for retail businesses or those handling regular cash.",
      policyHighlights: [
        "Protects cash in transit and on premises",
        "24/7 coverage option available",
        "Customizable limits"
      ],
      exclusions: [
        "Shortages due to errors",
        "Losses from unattended vehicles",
        "Unreported incidents"
      ],
      claimsProcess: "Police report and internal investigation documents required.",
      excessInfo: "R500 minimum or as specified in the policy.",
      periodOfCover: "Yearly, renewable basis.",
      category: "commercial"
    },
    {
      name: "Goods in Transit",
      description: "Covers goods while being transported by road within South Africa.",
      coverDetails: [
        "Damage or loss due to collision",
        "Theft",
        "Overturning",
        "Fire during transit"
      ],
      whoIsItFor: "Suitable for wholesalers, distributors, and logistics companies.",
      policyHighlights: [
        "Nationwide road transport cover",
        "Options for owned or third-party vehicles",
        "Fast processing for common incidents"
      ],
      exclusions: [
        "Improper packaging",
        "Delays",
        "Deterioration due to time or temperature"
      ],
      claimsProcess: "Proof of shipment, incident report, and invoices required.",
      excessInfo: "R1,000 - R10,000 depending on value and nature of goods.",
      periodOfCover: "12 months, renewable.",
      category: "commercial"
    },
    {
      name: "Public Liability",
      description: "Covers legal liability for accidental injury or property damage to third parties.",
      coverDetails: [
        "Legal costs and compensation for injury or damage occurring during business operations"
      ],
      whoIsItFor: "Crucial for businesses interacting with the public or clients on-site.",
      policyHighlights: [
        "Protects against legal claims",
        "High cover limits available",
        "Annual or project-specific policies"
      ],
      exclusions: [
        "Employee injury (covered under Workmen’s Compensation)",
        "Intentional acts",
        "Contractual liabilities"
      ],
      claimsProcess: "Incident report, legal correspondence, and witness statements may be required.",
      excessInfo: "Policy-specific, usually from R2,500 upwards.",
      periodOfCover: "12-month policy with annual renewal.",
      category: "commercial"
    }
  ];
  

const addProductInfo = async(req, res) => {

    try {
        console.log("at the controller");
        
        const addedProducts = await PdfProductInfo.insertMany(insuranceProducts)
        res.status(201).json({
            message: "Insurance products added successfully",
            data: addedProducts
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to add insurance products",
            error: error.message
          });      
    }
}

module.exports = { addProductInfo }