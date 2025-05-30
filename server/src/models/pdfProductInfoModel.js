const mongoose = require("mongoose");

const pdfProductInfo = new mongoose.Schema({
    name: String,
    description: String,
    coverDetails: [String],
    whoIsItFor: String,
    policyHighlights: [String],
    exclusions: [String],
    claimsProcess: String,
    excessInfo: String,
    periodOfCover: String,
    category: String // E.g., 'commercial', 'personal', 'specialist', etc.
  })

module.exports = mongoose.model('PdfProductInfo', pdfProductInfo)