const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.titan.email', //service provider
    port: 465,
    auth : {
        user: 'ethan@easy-outreach.com',
        pass: '3jmichael@UJ',
        // user: process.env.EMAIL_USER,
        // pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    }
});

const sendEmailWithPDF = async (to, subject, text, pdfBuffer, pdfFileName) => {
    const mailOptions = {
        from: 'ethan@easy-outreach.com',
        to, 
        subject,
        text,
        attachments: [
            {
                fileName: pdfFileName,
                content: pdfBuffer,
                contentType: 'application/pdf'
            },
        ],
    };
    return transporter.sendMail(mailOptions)
};

module.exports = { sendEmailWithPDF };