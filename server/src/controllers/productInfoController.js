const express = require('express')
const PdfProductInfo = require('../models/pdfProductInfoModel')

const insuranceProducts = [
  {
    name: "Trade Credit",
    description: "Protects businesses against the risk of non-payment by customers for goods or services supplied on credit.",
    coverDetails: [
      "Non-payment due to insolvency",
      "Protracted default",
      "Political risks in export markets",
      "Customer bankruptcy or liquidation"
    ],
    whoIsItFor: "Suppliers and manufacturers offering goods or services on credit terms.",
    policyHighlights: [
      "Covers domestic and international clients",
      "Reduces bad debt exposure",
      "Improves access to financing by securing receivables"
    ],
    exclusions: [
      "Disputes over goods or services",
      "Pre-existing overdue accounts",
      "Fraud or dishonesty by the insured"
    ],
    claimsProcess: "Submit proof of default, credit agreement, and collection efforts before initiating a claim.",
    excessInfo: "Typically 10% of the claim amount or as defined in the policy schedule.",
    periodOfCover: "12-month renewable policy aligned with sales agreements.",
    category: "credit"
  }, {
    name: "Credit Insurance",
    description: "Offers protection to businesses against the failure of customers to pay their trade debts.",
    coverDetails: [
      "Customer insolvency",
      "Default or delayed payments",
      "Coverage for specific buyers or entire portfolio"
    ],
    whoIsItFor: "Any business that extends credit to customers, especially in B2B transactions.",
    policyHighlights: [
      "Supports risk management",
      "Facilitates safer sales growth",
      "Can be tailored by buyer, region, or transaction type"
    ],
    exclusions: [
      "Sales not reported under the policy",
      "Sales after policy cancellation",
      "Deliberate non-compliance with credit terms"
    ],
    claimsProcess: "Claim requires buyer default notice, invoice records, and credit terms proof.",
    excessInfo: "Percentage-based deductible depending on risk profile and claim history.",
    periodOfCover: "12-month term with optional extensions.",
    category: "credit"
  },{
    name: "Fuel Guarantee",
    description: "Provides a financial guarantee to fuel suppliers ensuring payment security on behalf of fuel buyers.",
    coverDetails: [
      "Secures fuel purchases on credit terms",
      "Covers default in payment by the buyer",
      "Supports trade relationships in fuel distribution"
    ],
    whoIsItFor: "Fuel retailers, wholesalers, or logistics companies procuring fuel on credit.",
    policyHighlights: [
      "Assures suppliers of payment",
      "Improves buyer creditworthiness",
      "Can be tailored for specific volume or time periods"
    ],
    exclusions: [
      "Fraudulent activities",
      "Non-contractual purchases",
      "Disputes over quantity or quality of fuel"
    ],
    claimsProcess: "Claim initiated upon buyer default with supporting invoice and supply contract documentation.",
    excessInfo: "Policy-specific deductible based on fuel volume and buyer risk.",
    periodOfCover: "Typically aligned with supply contract duration; renewable annually.",
    category: "guarantees"
  },{
    name: "Performance Guarantee",
    description: "Provides assurance to a project owner that a contractor will fulfill their contractual obligations.",
    coverDetails: [
      "Covers contractor default",
      "Non-performance of agreed duties",
      "Delays or failure to meet milestones"
    ],
    whoIsItFor: "Construction companies, engineering firms, or service contractors involved in public or private projects.",
    policyHighlights: [
      "Protects project owners from losses due to non-performance",
      "Boosts contractor credibility",
      "Often required for tenders or large projects"
    ],
    exclusions: [
      "Force majeure events",
      "Scope changes not reflected in the contract",
      "Owner-induced delays"
    ],
    claimsProcess: "Submit evidence of contract breach and project details; typically includes certified non-performance report.",
    excessInfo: "Usually no excess, but payout subject to guarantee amount and terms.",
    periodOfCover: "Matches the project term or contract period.",
    category: "guarantees"
  },{
    name: "Construction Guarantee",
    description: "Ensures the financial backing for contractors undertaking construction projects to guarantee project delivery.",
    coverDetails: [
      "Advance payment guarantees",
      "Bid bonds",
      "Retention money guarantees",
      "Performance and completion guarantees"
    ],
    whoIsItFor: "Contractors and developers involved in residential, commercial, or infrastructure construction.",
    policyHighlights: [
      "Multiple guarantee types under one facility",
      "Meets tender requirements",
      "Reduces project risk for employers"
    ],
    exclusions: [
      "Contractor insolvency due to negligence",
      "Unapproved design changes",
      "Illegal construction practices"
    ],
    claimsProcess: "Submission of breach notice and construction contract, validated by an independent third-party or project manager.",
    excessInfo: "Varies by guarantee type; typically no excess on bid bonds and performance guarantees.",
    periodOfCover: "Aligned with the project timeline or contract duration.",
    category: "guarantees"
  }, {
    name: "Mining Rehabilitation Guarantee",
    description: "Assures government or environmental authorities that funds will be available for land rehabilitation after mining operations.",
    coverDetails: [
      "Post-mining land restoration",
      "Environmental clean-up",
      "Rehabilitation of ecosystems affected by mining"
    ],
    whoIsItFor: "Mining companies operating under environmental compliance regulations.",
    policyHighlights: [
      "Meets legal compliance obligations",
      "Ensures no public liability for rehabilitation costs",
      "Allows release of cash from escrow or deposits"
    ],
    exclusions: [
      "Damage outside licensed area",
      "Illegal mining operations",
      "Failure to meet environmental requirements pre-policy"
    ],
    claimsProcess: "Requires submission of environmental audit report, non-compliance proof, and approved rehabilitation plan.",
    excessInfo: "Not applicable as it’s a guarantee rather than an indemnity cover.",
    periodOfCover: "Valid for the life of the mining project; typically reviewed annually.",
    category: "guarantees"
  }, {
    name: "Hull Insurance",
    description: "Provides cover for physical damage to aircraft including both ground and in-flight risks.",
    coverDetails: [
      "Accidental damage to the aircraft",
      "Damage during take-off, landing, or taxiing",
      "Fire, explosion, and lightning damage",
      "Vandalism or theft of aircraft parts"
    ],
    whoIsItFor: "Aircraft owners and operators, including charter services, private owners, and aviation companies.",
    policyHighlights: [
      "Covers the full value of the aircraft",
      "Customizable cover for specific risks",
      "Includes spare parts and avionics (if specified)"
    ],
    exclusions: [
      "Wear and tear or gradual deterioration",
      "Mechanical or electrical breakdown",
      "Use for unauthorized purposes (e.g. war zones)"
    ],
    claimsProcess: "Accident report, repair quotation, and aviation authority investigation results are typically required.",
    excessInfo: "Varies by aircraft type and use; often a fixed amount or percentage of aircraft value.",
    periodOfCover: "12-month policy, renewable annually.",
    category: "aviation"
  }, {
    name: "Passenger Liability",
    description: "Covers legal liability for injury or death of passengers while boarding, in-flight, or disembarking from the aircraft.",
    coverDetails: [
      "Legal liability for bodily injury or death",
      "Medical expenses for injured passengers",
      "Compensation in the event of legal claims"
    ],
    whoIsItFor: "Commercial and private aircraft operators carrying passengers.",
    policyHighlights: [
      "Complies with international aviation conventions",
      "Essential for licensed passenger flights",
      "High-limit liability options available"
    ],
    exclusions: [
      "Unlawful acts by crew or operator",
      "Use of aircraft outside policy conditions",
      "War or terrorism (unless specifically included)"
    ],
    claimsProcess: "Claim initiated with passenger list, incident report, and relevant medical/legal documents.",
    excessInfo: "May apply per passenger or per event depending on the policy.",
    periodOfCover: "Annually renewable or per-flight basis for charters.",
    category: "aviation"
  }, {
    name: "Personal Accident",
    description: "Provides fixed benefit compensation for injury, disability, or death of crew or pilots during aviation operations.",
    coverDetails: [
      "Accidental death benefit",
      "Permanent disability cover",
      "Temporary total disablement cover",
      "Medical expense reimbursement"
    ],
    whoIsItFor: "Pilots, flight crew, and aviation staff involved in flight operations.",
    policyHighlights: [
      "24/7 cover while on duty",
      "Benefits paid in addition to liability insurance",
      "Can be customized by role or rank"
    ],
    exclusions: [
      "Pre-existing conditions",
      "Non-duty related injuries (unless extended)",
      "Substance abuse or unlawful behavior"
    ],
    claimsProcess: "Accident report, medical records, and confirmation of employment or duty at time of accident.",
    excessInfo: "Usually none; benefits are paid as per fixed schedule.",
    periodOfCover: "12 months with renewal option.",
    category: "aviation"
  },{
    name: "Public Liability",
    description: "Protects aircraft operators from third-party claims for bodily injury or property damage caused by the aircraft (excluding passengers).",
    coverDetails: [
      "Damage to third-party property (e.g. buildings, vehicles)",
      "Injury to bystanders or airport staff",
      "Legal costs and compensation"
    ],
    whoIsItFor: "All aircraft operators, particularly those operating near populated or public areas.",
    policyHighlights: [
      "Covers accidents on the ground and in flight",
      "International cover options available",
      "Flexible limits based on aircraft risk profile"
    ],
    exclusions: [
      "Injury to crew or passengers (covered under separate policies)",
      "Intentional damage",
      "Damage to owned or leased property"
    ],
    claimsProcess: "Submission of third-party report, incident report, and supporting photographic or video evidence.",
    excessInfo: "Set per incident or claim basis, depending on aircraft type.",
    periodOfCover: "12-month term, renewable.",
    category: "aviation"
  },{
    name: "Marine Cargo",
    description: "Covers goods in transit over sea, air, or land against loss or damage during shipment.",
    coverDetails: [
      "Loss or damage due to perils of the sea (sinking, collision, fire)",
      "Theft or pilferage during transit",
      "General average and salvage charges",
      "Transit by sea, air, rail, or road"
    ],
    whoIsItFor: "Importers, exporters, logistics companies, and manufacturers transporting goods internationally or locally.",
    policyHighlights: [
      "Single transit or annual open policy options",
      "Worldwide coverage available",
      "Customizable limits and routes"
    ],
    exclusions: [
      "Inherent vice or nature of the goods",
      "Improper packing",
      "War, strikes, or nuclear risks (unless covered by extension)"
    ],
    claimsProcess: "Shipping documents, bill of lading, incident report, and photographic evidence required.",
    excessInfo: "Based on value and type of cargo; typically a fixed amount per claim.",
    periodOfCover: "Per voyage or annually renewable open cover.",
    category: "marine"
  },{
    name: "Marine Hull / Watercraft",
    description: "Covers physical damage to vessels including boats, ships, barges, and other watercraft.",
    coverDetails: [
      "Accidental loss or damage",
      "Fire, explosion, collision, grounding",
      "Theft and vandalism",
      "Storm or natural peril damage"
    ],
    whoIsItFor: "Owners and operators of commercial vessels, fishing boats, barges, and leisure craft.",
    policyHighlights: [
      "Cover for hull, machinery, and onboard equipment",
      "Optional third-party liability extension",
      "Survey and maintenance discounts available"
    ],
    exclusions: [
      "Wear and tear",
      "Unseaworthiness or poor maintenance",
      "Crew negligence or illegal activities"
    ],
    claimsProcess: "Surveyor's report, repair quotes, accident log, and vessel documentation required.",
    excessInfo: "Depends on vessel type, age, and value; usually a fixed deductible per claim.",
    periodOfCover: "Annual policy with renewal option.",
    category: "marine"
  },{
    name: "Stock Throughput",
    description: "All-risk insurance that covers inventory from production to final delivery, including storage and transit.",
    coverDetails: [
      "Transit damage (land, air, sea)",
      "Theft and pilferage",
      "Fire and natural catastrophes in storage",
      "Loading/unloading damages"
    ],
    whoIsItFor: "Manufacturers, wholesalers, and global distributors with goods in constant motion and storage.",
    policyHighlights: [
      "End-to-end supply chain coverage",
      "Combines marine cargo and property policies into one",
      "Flexible and scalable for growing operations"
    ],
    exclusions: [
      "Poor packaging or storage conditions",
      "Deliberate damage or fraud",
      "Unexplained shortages"
    ],
    claimsProcess: "Incident documentation, inventory reports, and transport records are required for claim assessment.",
    excessInfo: "May vary between storage and transit sections; typically a fixed excess per section.",
    periodOfCover: "12-month term, renewable.",
    category: "marine"
  }, {
    name: "Watercraft",
    description: "Covers privately-owned leisure boats, yachts, jet skis, and similar vessels against damage and liability.",
    coverDetails: [
      "Accidental damage to vessel",
      "Theft and malicious damage",
      "Third-party liability cover",
      "Storm and mooring damage"
    ],
    whoIsItFor: "Individuals and clubs owning personal or recreational watercraft.",
    policyHighlights: [
      "Agreed value or market value settlement options",
      "Cover in inland waters, rivers, and approved coastal zones",
      "Emergency tow assistance add-on available"
    ],
    exclusions: [
      "Use in unauthorized waters",
      "Participation in racing (unless covered)",
      "Negligent or reckless operation"
    ],
    claimsProcess: "Damage report, photographs, skipper’s statement, and survey report required.",
    excessInfo: "Fixed excess depending on vessel size and usage, often higher for theft claims.",
    periodOfCover: "Annual, renewable policy.",
    category: "marine"
  }, {
    name: "Group Personal Accident",
    description: "Provides compensation to employees or group members in case of accidental injury, disability, or death.",
    coverDetails: [
      "Accidental death",
      "Permanent total or partial disability",
      "Temporary total disability",
      "Medical expenses related to accidents"
    ],
    whoIsItFor: "Employers or organizations looking to protect their teams, including contractors and employees.",
    policyHighlights: [
      "24/7 worldwide accident cover",
      "Customizable benefits per role or category",
      "Helps fulfill employer duty-of-care obligations"
    ],
    exclusions: [
      "Injuries from criminal acts or intoxication",
      "Self-inflicted injuries",
      "War, terrorism (unless extended)"
    ],
    claimsProcess: "Accident report, medical documents, and employer confirmation required.",
    excessInfo: "No excess for death or permanent disability; medical expense claims may have a fixed excess.",
    periodOfCover: "Annual policy covering members listed or declared.",
    category: "accident-health"
  }, {
    name: "Business Travel",
    description: "Insurance for employees traveling for work, covering medical emergencies, trip interruptions, and more.",
    coverDetails: [
      "Medical emergency expenses abroad",
      "Trip cancellations or delays",
      "Lost or delayed baggage",
      "Emergency evacuation and repatriation"
    ],
    whoIsItFor: "Businesses with employees who travel locally or internationally for work.",
    policyHighlights: [
      "Global emergency medical cover",
      "Includes travel inconvenience benefits",
      "Annual or per-trip coverage options"
    ],
    exclusions: [
      "Pre-existing medical conditions",
      "Travel against medical advice",
      "Trips for leisure or personal reasons (unless covered)"
    ],
    claimsProcess: "Submit travel documents, boarding passes, medical bills, and incident reports.",
    excessInfo: "Often no excess on emergency medical; small fixed excess for baggage or delay claims.",
    periodOfCover: "Annual multi-trip or single-trip basis.",
    category: "accident-health"
  },{
    name: "Leisure Travel",
    description: "Short-term insurance for individuals or families traveling for holidays or personal reasons.",
    coverDetails: [
      "Emergency medical treatment abroad",
      "Trip cancellation or curtailment",
      "Loss of luggage or passport",
      "Personal liability while traveling"
    ],
    whoIsItFor: "Tourists, holidaymakers, and individuals traveling for non-work-related reasons.",
    policyHighlights: [
      "Affordable plans for domestic and international travel",
      "Children often covered for free under family plans",
      "COVID-19 and pandemic cover options"
    ],
    exclusions: [
      "Adventure sports (unless extended)",
      "Trips taken against travel advisories",
      "Routine medical treatment"
    ],
    claimsProcess: "Medical report, travel documents, receipts, and evidence of trip disruption required.",
    excessInfo: "Typically R500 – R1,000 per claim depending on section.",
    periodOfCover: "Per trip, with duration options from a few days to 90+ days.",
    category: "accident-health"
  }, {
    name: "Specialised Electronic Equipment",
    description: "Insurance for high-value, sensitive electronic equipment such as servers, medical devices, or broadcasting systems.",
    coverDetails: [
      "Accidental physical loss or damage",
      "Fire, theft, and power surge protection",
      "Transit and relocation risks",
      "Optional cover for increased cost of working"
    ],
    whoIsItFor: "Businesses using specialized electronics in sectors like healthcare, IT, media, and research.",
    policyHighlights: [
      "Tailored to cover expensive, delicate electronics",
      "Can include data loss recovery options",
      "Coverage during movement or relocation"
    ],
    exclusions: [
      "Wear and tear",
      "Gradual deterioration",
      "Negligence or lack of maintenance"
    ],
    claimsProcess: "Detailed damage report, photographs, service records, and quote for repair/replacement required.",
    excessInfo: "Typically 10% of claim value or R1,000 minimum.",
    periodOfCover: "12 months, renewable annually.",
    category: "engineering-risks"
  }, {
    name: "Contractors All Risks",
    description: "Comprehensive cover for construction projects, protecting both the works and third-party liability.",
    coverDetails: [
      "Damage to contract works",
      "Loss or damage to materials on-site",
      "Third-party liability for injury or property damage",
      "Damage due to fire, theft, storm, or flood"
    ],
    whoIsItFor: "Building contractors, developers, and construction firms.",
    policyHighlights: [
      "Cover during the entire construction period",
      "Includes temporary structures and on-site materials",
      "Customizable for single projects or annual contracts"
    ],
    exclusions: [
      "Defective design or workmanship",
      "Wear and tear",
      "Consequential loss"
    ],
    claimsProcess: "Site incident report, construction records, photographs, and damage estimates required.",
    excessInfo: "Varies by section – typically R2,500+ per incident.",
    periodOfCover: "Project duration or annual basis for multiple contracts.",
    category: "engineering-risks"
  }, {
    name: "Contractors Plant and Equipment/Plant",
    description: "Covers loss or damage to construction machinery and plant used on-site or in transit.",
    coverDetails: [
      "Accidental damage",
      "Fire, theft, and vandalism",
      "Damage during loading/unloading or transit",
      "Breakdown of insured equipment"
    ],
    whoIsItFor: "Construction and engineering companies with owned or hired plant and machinery.",
    policyHighlights: [
      "Cover for mobile and fixed equipment",
      "Optional hire charges recovery",
      "Applicable whether on-site, in storage, or being transported"
    ],
    exclusions: [
      "Wear and tear or mechanical failure (unless extended)",
      "Operation outside manufacturer guidelines",
      "Lack of proper security"
    ],
    claimsProcess: "Equipment logs, damage report, and cost estimates for repair or replacement needed.",
    excessInfo: "Minimum excess often 10% of claim value or R2,000.",
    periodOfCover: "Annual cover, or project-specific policy term.",
    category: "engineering-risks"
  }, {
    name: "Machinery Breakdown",
    description: "Covers sudden and unforeseen damage to insured machinery due to mechanical or electrical failure.",
    coverDetails: [
      "Electrical burnout",
      "Mechanical failure",
      "Operator error resulting in equipment damage",
      "Optional loss of profits due to downtime"
    ],
    whoIsItFor: "Manufacturing plants, industrial operations, or any business using machinery critical to operations.",
    policyHighlights: [
      "Protects against production downtime",
      "Customizable based on machine type and usage",
      "Optional cover for loss of profit/business interruption"
    ],
    exclusions: [
      "Gradual wear and tear",
      "Pre-existing conditions",
      "Corrosion or rust"
    ],
    claimsProcess: "Inspection report, incident summary, repair estimate, and service logs required.",
    excessInfo: "Typically 10% of repair costs or fixed amount starting at R1,000.",
    periodOfCover: "Annual policy with renewal option.",
    category: "engineering-risks"
  },  {
    name: "Broadform Liability",
    description: "Comprehensive liability insurance covering various third-party risks not otherwise insured.",
    coverDetails: [
      "Public liability",
      "Product liability",
      "Tenant liability",
      "Vicarious liability"
    ],
    whoIsItFor: "Businesses with diverse liability exposures seeking a broad, consolidated cover.",
    policyHighlights: [
      "Covers multiple liability risks",
      "Flexible policy wording",
      "Can be tailored to business operations"
    ],
    exclusions: [
      "Contractual liabilities",
      "Fines and penalties",
      "Known claims prior to inception"
    ],
    claimsProcess: "Submit claim form, legal documents, and incident report.",
    excessInfo: "From R2,500 depending on risk category.",
    periodOfCover: "Annual policy, renewable.",
    category: "specialist-liability"
  },
  {
    name: "Commercial Crime",
    description: "Covers financial losses resulting from fraudulent or dishonest acts by employees or third parties.",
    coverDetails: [
      "Employee dishonesty",
      "Computer fraud",
      "Forgery",
      "Third-party theft"
    ],
    whoIsItFor: "Companies exposed to internal or external financial fraud risks.",
    policyHighlights: [
      "Protects against internal embezzlement",
      "Covers electronic and manual fraud",
      "Option to include audit fees"
    ],
    exclusions: [
      "Losses after discovery of fraud",
      "Acts by owners or directors",
      "Poor internal controls"
    ],
    claimsProcess: "Submit police report, forensic audit findings, and financial statements.",
    excessInfo: "Typically 10% of claim amount or policy minimum.",
    periodOfCover: "12 months with annual renewal.",
    category: "specialist-liability"
  },
  {
    name: "Cyber Liability",
    description: "Protection against data breaches, cyber attacks, and associated legal and recovery costs.",
    coverDetails: [
      "Data breach response",
      "Ransomware and extortion",
      "Business interruption",
      "Third-party liability"
    ],
    whoIsItFor: "Businesses handling sensitive digital data or reliant on online systems.",
    policyHighlights: [
      "24/7 incident response support",
      "Regulatory compliance coverage",
      "Optional reputation management"
    ],
    exclusions: [
      "Negligent IT security maintenance",
      "Unreported breaches",
      "Pre-existing known vulnerabilities"
    ],
    claimsProcess: "Immediate notification, breach report, and forensic IT analysis required.",
    excessInfo: "Varies by policy, usually from R10,000 upwards.",
    periodOfCover: "Annual term, renewable.",
    category: "specialist-liability"
  },
  {
    name: "Directors and Officers Liability",
    description: "Covers personal liability of company directors and officers for decisions made in their role.",
    coverDetails: [
      "Legal defense costs",
      "Claims by shareholders or regulators",
      "Employment practice claims",
      "Mismanagement or breach of duty"
    ],
    whoIsItFor: "Executives, board members, and senior managers in private or public companies.",
    policyHighlights: [
      "Safeguards personal assets",
      "Essential for governance and risk",
      "Global jurisdiction options"
    ],
    exclusions: [
      "Fraud or criminal acts",
      "Breach of professional duties",
      "Prior claims or investigations"
    ],
    claimsProcess: "Legal notice submission, board minutes, and relevant correspondence.",
    excessInfo: "Typically R25,000 - R100,000 depending on company size.",
    periodOfCover: "Renewed annually, claims-made basis.",
    category: "specialist-liability"
  },
  {
    name: "Employment Practices Liability",
    description: "Covers employers against claims made by employees regarding wrongful employment acts.",
    coverDetails: [
      "Unfair dismissal",
      "Discrimination or harassment claims",
      "Failure to promote or hire",
      "Retaliation claims"
    ],
    whoIsItFor: "Any employer with staff, particularly medium to large businesses.",
    policyHighlights: [
      "Covers legal fees and settlements",
      "Includes HR consultancy support",
      "Protects company and management"
    ],
    exclusions: [
      "Breach of contract",
      "Willful misconduct",
      "Wage disputes"
    ],
    claimsProcess: "Employee complaint, legal proceedings, and internal records needed.",
    excessInfo: "Minimum R10,000 or more based on company size.",
    periodOfCover: "One year, renewable annually.",
    category: "specialist-liability"
  },
  {
    name: "Environmental Impairment Liability",
    description: "Provides coverage for pollution or environmental damage caused by business operations.",
    coverDetails: [
      "Clean-up costs",
      "Third-party injury or property damage",
      "Legal defense",
      "Regulatory fines (optional)"
    ],
    whoIsItFor: "Manufacturers, industrial facilities, waste processors, and chemical handlers.",
    policyHighlights: [
      "Covers sudden and gradual pollution",
      "Flexible site-specific cover",
      "Can include transportation risks"
    ],
    exclusions: [
      "Intentional non-compliance",
      "Known environmental risks",
      "Pre-existing contamination"
    ],
    claimsProcess: "Environmental assessment, incident report, and regulatory filings required.",
    excessInfo: "R50,000 or more depending on site risk.",
    periodOfCover: "Annual, subject to environmental audit.",
    category: "specialist-liability"
  },
  {
    name: "Professional Indemnity",
    description: "Covers professionals against claims of negligence, errors, or omissions in their services.",
    coverDetails: [
      "Legal defense for alleged mistakes",
      "Settlements and judgments",
      "Breach of duty or negligence",
      "Loss of documents"
    ],
    whoIsItFor: "Consultants, lawyers, engineers, IT providers, and other professional service providers.",
    policyHighlights: [
      "Claims-made basis",
      "Tailor-made for each profession",
      "High-limit coverage available"
    ],
    exclusions: [
      "Dishonesty or fraud",
      "Bodily injury (unless stated)",
      "Known prior acts"
    ],
    claimsProcess: "Claim form, client communication, and engagement contract required.",
    excessInfo: "Policy-specific, starts from R5,000.",
    periodOfCover: "Typically 12 months with retroactive cover options.",
    category: "specialist-liability"
  },
  {
    name: "Medical Malpractice",
    description: "Liability insurance for healthcare professionals against malpractice claims.",
    coverDetails: [
      "Errors in diagnosis or treatment",
      "Wrongful procedures",
      "Failure to provide appropriate care",
      "Legal defense and settlements"
    ],
    whoIsItFor: "Doctors, surgeons, dentists, nurses, and other licensed health professionals.",
    policyHighlights: [
      "Covers regulatory defense",
      "Retroactive cover available",
      "Supports mediation and legal fees"
    ],
    exclusions: [
      "Intentional acts or gross negligence",
      "Services outside scope of license",
      "Unlicensed staff"
    ],
    claimsProcess: "Submit incident records, medical files, and patient complaint documentation.",
    excessInfo: "Typically R10,000 – R50,000 depending on profession.",
    periodOfCover: "12-month renewable policy, claims-made basis.",
    category: "specialist-liability"
  },
  {
    name: "Kidnap and Ransom/Extortion",
    description: "Provides financial protection and expert crisis response for kidnapping, extortion, or ransom threats.",
    coverDetails: [
      "Ransom payments",
      "Negotiation expenses",
      "Security consulting",
      "Loss of income during crisis"
    ],
    whoIsItFor: "High-profile individuals, executives, journalists, and companies operating in high-risk areas.",
    policyHighlights: [
      "24/7 global emergency support",
      "Includes extortion and detention",
      "Confidential and discreet cover"
    ],
    exclusions: [
      "Self-inflicted situations",
      "Fraudulent claims",
      "Known travel bans"
    ],
    claimsProcess: "Contact crisis response team, document the incident, and follow insurer’s security protocols.",
    excessInfo: "High excess due to specialized nature, typically above R25,000.",
    periodOfCover: "12-month contract, subject to region and occupation.",
    category: "specialist-liability"
  },{
    name: "Accidental Damage",
    description: "Provides cover for unforeseen and unintended physical loss or damage to insured property.",
    coverDetails: [
      "Sudden and unforeseen physical loss or damage",
      "Applies to contents and fixed assets",
      "Covers accidental events not specifically excluded"
    ],
    whoIsItFor: "Businesses seeking broad protection against unintentional damage to assets.",
    policyHighlights: [
      "Broad scope of cover",
      "Can complement fire and theft cover",
      "Customisable limits"
    ],
    exclusions: [
      "Wear and tear",
      "Mechanical or electrical breakdown",
      "Deliberate acts"
    ],
    claimsProcess: "Submit incident details, damage photos, and repair/replacement quotes.",
    excessInfo: "R1,000 – R10,000 depending on insured value.",
    periodOfCover: "12-month renewable policy.",
    category: "commercial"
  },{
    name: "Buildings Combined",
    description: "Protects commercial buildings against a wide range of perils, including fire, storm, and malicious damage.",
    coverDetails: [
      "Fire and explosion",
      "Storm and flood damage",
      "Malicious acts and impact",
      "Subsidence and landslip (optional)"
    ],
    whoIsItFor: "Commercial property owners and landlords.",
    policyHighlights: [
      "Comprehensive structural protection",
      "Optional extras available",
      "Includes landlord fixtures"
    ],
    exclusions: [
      "Pre-existing damage",
      "Poor maintenance",
      "War and nuclear risks"
    ],
    claimsProcess: "Site inspection, damage report, and contractor quotes required.",
    excessInfo: "From R2,000 or as per policy schedule.",
    periodOfCover: "Annually renewable.",
    category: "commercial"
  },{
    name: "Business All Risks",
    description: "Cover for portable equipment and assets anywhere in South Africa and sometimes abroad.",
    coverDetails: [
      "Loss or damage to specified items",
      "Cover outside business premises",
      "Theft, accidental loss or destruction"
    ],
    whoIsItFor: "Businesses with laptops, tools, and mobile equipment.",
    policyHighlights: [
      "Worldwide cover options",
      "Customisable item list",
      "Ideal for mobile professionals"
    ],
    exclusions: [
      "Negligence or careless handling",
      "Unspecified items",
      "Wear and tear"
    ],
    claimsProcess: "Proof of loss, police report, and invoice required.",
    excessInfo: "Usually R500 – R2,000 depending on item value.",
    periodOfCover: "Annual renewable.",
    category: "commercial"
  },{
    name: "Business Interruption",
    description: "Covers loss of income due to unexpected interruption caused by an insured peril.",
    coverDetails: [
      "Loss of revenue after fire or storm damage",
      "Ongoing fixed expenses",
      "Gross profit protection"
    ],
    whoIsItFor: "Any business needing income continuity after a major loss.",
    policyHighlights: [
      "Can include contingent business interruption",
      "Matches cover under fire/buildings",
      "Flexible indemnity periods"
    ],
    exclusions: [
      "Losses from uninsured perils",
      "Delay in claim reporting",
      "Inaccurate financial records"
    ],
    claimsProcess: "Financial statements and damage proof needed.",
    excessInfo: "Time excess (e.g. 48–72 hours) or monetary excess.",
    periodOfCover: "Typically 12 months, with 3–12 month indemnity period.",
    category: "commercial"
  },{
    name: "Electronic Equipment",
    description: "Protects computers, printers, servers, and other electronic equipment against sudden loss or damage.",
    coverDetails: [
      "Accidental damage",
      "Theft or attempted theft",
      "Power surges and lightning"
    ],
    whoIsItFor: "Businesses using high-value electronics or dependent on IT.",
    policyHighlights: [
      "Can include reinstatement of data",
      "Portable and fixed device cover",
      "Service provider equipment can be added"
    ],
    exclusions: [
      "Manufacturer’s defects",
      "Obsolete equipment",
      "Data corruption from viruses"
    ],
    claimsProcess: "Proof of ownership, damage photos, and repair invoices needed.",
    excessInfo: "Ranges from R500 – R5,000 depending on device value.",
    periodOfCover: "12 months, renewable.",
    category: "commercial"
  },{
    name: "Fidelity Guarantee",
    description: "Covers direct financial loss resulting from fraud or dishonesty by employees.",
    coverDetails: [
      "Theft of money or property by employees",
      "Loss from embezzlement or forgery",
      "Can be on named or blanket basis"
    ],
    whoIsItFor: "Businesses of all sizes concerned with internal theft.",
    policyHighlights: [
      "Customisable employee coverage",
      "Can include third-party cover",
      "Essential for finance/admin-heavy roles"
    ],
    exclusions: [
      "Known dishonest employees",
      "Lack of internal controls",
      "Losses after discovery period"
    ],
    claimsProcess: "Submit proof of loss, employee details, and investigation reports.",
    excessInfo: "R1,000 – R10,000+ based on risk profile.",
    periodOfCover: "12-month renewable policy.",
    category: "commercial"
  },{
    name: "Fire",
    description: "Provides cover for damage to property caused by fire, lightning, and explosions.",
    coverDetails: [
      "Fire, explosion and lightning damage",
      "Optional cover for storm, flood or earthquake",
      "Damage to buildings and contents"
    ],
    whoIsItFor: "Any business with physical assets, offices, or stock.",
    policyHighlights: [
      "Essential base cover for buildings",
      "Customisable sums insured",
      "Can be combined with business interruption"
    ],
    exclusions: [
      "Spontaneous combustion",
      "Arson by insured",
      "Electrical faults unless specifically included"
    ],
    claimsProcess: "Provide fire department report, asset register, and damage photos.",
    excessInfo: "Starts from R2,000, based on asset type and risk.",
    periodOfCover: "Annual cover, renewable.",
    category: "commercial"
  },{
    name: "Glass",
    description: "Insures fixed glass against accidental breakage, including signage and shopfronts.",
    coverDetails: [
      "Accidental and malicious breakage",
      "Shopfront and window glass",
      "Includes signage and display windows"
    ],
    whoIsItFor: "Retailers, offices, and buildings with visible/external glass.",
    policyHighlights: [
      "Quick replacement cover",
      "Can be extended to mirror or signage glass",
      "Low excess options"
    ],
    exclusions: [
      "Scratches or chipping",
      "Wear and tear",
      "Unlawful acts by insured"
    ],
    claimsProcess: "Photographs, invoice for replacement, and incident description required.",
    excessInfo: "Typically R500 – R2,000.",
    periodOfCover: "12 months, renewable.",
    category: "commercial"
  },{
    name: "Machinery Breakdown",
    description: "Covers sudden mechanical or electrical breakdown of machinery used in business operations.",
    coverDetails: [
      "Internal mechanical or electrical breakdown",
      "Sudden and unforeseen failure",
      "Covers repair or replacement"
    ],
    whoIsItFor: "Manufacturing, factories, and workshops using large machinery.",
    policyHighlights: [
      "Can include production loss cover",
      "Optional business interruption link",
      "Ideal for plant operations"
    ],
    exclusions: [
      "Gradual deterioration",
      "Lack of maintenance",
      "Operational errors"
    ],
    claimsProcess: "Provide maintenance logs, repair estimates, and downtime reports.",
    excessInfo: "Ranges from R2,000 – R20,000 based on machine value.",
    periodOfCover: "12-month period.",
    category: "commercial"
  },{
    name: "Money",
    description: "Provides cover for loss of business money while on premises, in transit, or in safes.",
    coverDetails: [
      "Cash theft from premises or in transit",
      "Cover for safes and strongrooms",
      "Can include assault to staff during theft"
    ],
    whoIsItFor: "Businesses handling regular cash deposits or transactions.",
    policyHighlights: [
      "24/7 cover available",
      "Transit and night-time cover options",
      "Can cover till floats and petty cash"
    ],
    exclusions: [
      "Employee theft unless combined with Fidelity Guarantee",
      "Unattended cash in unlocked areas",
      "Loss after business hours if not stored securely"
    ],
    claimsProcess: "Submit police report, transaction records, and theft incident description.",
    excessInfo: "From R500 depending on sum insured.",
    periodOfCover: "Annual cover.",
    category: "commercial"
  },{
    name: "Office Contents",
    description: "Protects office furniture, fittings, equipment and stock against various insured perils.",
    coverDetails: [
      "Loss or damage from fire, theft, or storm",
      "Office furniture and fittings",
      "Includes stationery, files, and small equipment"
    ],
    whoIsItFor: "Businesses operating from physical offices.",
    policyHighlights: [
      "Broad contents protection",
      "Custom sum insured per room/area",
      "Optional portable items cover"
    ],
    exclusions: [
      "Wear and tear",
      "Theft without forcible entry",
      "Items not declared or documented"
    ],
    claimsProcess: "Submit inventory, purchase proof, and incident report.",
    excessInfo: "Starts at R1,000 – R5,000.",
    periodOfCover: "12-month renewable.",
    category: "commercial"
  },{
    name: "Theft",
    description: "Provides cover for loss due to theft involving forcible and violent entry or exit.",
    coverDetails: [
      "Theft with evidence of force",
      "Burglary protection for business contents",
      "Optional cover for attempted theft"
    ],
    whoIsItFor: "Businesses in areas with medium to high theft risk.",
    policyHighlights: [
      "Linked to alarm or security system conditions",
      "Pair with Money and Office Contents cover",
      "Customisable limits"
    ],
    exclusions: [
      "Employee theft",
      "No evidence of forced entry",
      "Theft of mobile items unless specified"
    ],
    claimsProcess: "Police report, proof of break-in, and loss inventory required.",
    excessInfo: "R1,500 and upwards depending on contents insured.",
    periodOfCover: "12-month policy.",
    category: "commercial"
  },{
    name: "Motor",
    description: "Covers business vehicles against damage, theft, and third-party liability.",
    coverDetails: [
      "Own damage (accidents, hail, fire)",
      "Third-party injury or property damage",
      "Theft and hijacking"
    ],
    whoIsItFor: "Businesses with delivery vehicles, fleets, or staff transport.",
    policyHighlights: [
      "Comprehensive or third-party only options",
      "Includes towing and car hire benefits",
      "Fleet discounts for multiple vehicles"
    ],
    exclusions: [
      "Unlicensed drivers",
      "Drunk driving",
      "Wear and tear"
    ],
    claimsProcess: "Vehicle inspection, police case number, and repair quote required.",
    excessInfo: "Starts from R3,000 depending on vehicle and claim type.",
    periodOfCover: "Annually renewable.",
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