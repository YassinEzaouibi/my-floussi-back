// emailService.js
const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text, html) => {
    try {
        // Configure the transporter
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "zouibiyassin03@gmail.com",
                pass: "apsy zgbn yfbh rfsg",
            },
        });

        // Email options
        let mailOptions = {
            from: "zouibiyassin03@gmail.com",
            to: to,
            subject: subject,
            text: text,
            html: html,
        };

        // Send the email
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = sendEmail;
