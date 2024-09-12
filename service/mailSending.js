// emailService.js
const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text, html, attachments = []) => {
    try {
        // Configure the transporter
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ADMIN,
                pass: process.env.PASSWORD_THIRD_APP,
            },
        });

        // Email options
        let mailOptions = {
            from: process.env.EMAIL_ADMIN,
            to: to,
            subject: subject,
            text: text,
            html: html,
            attachments: attachments,
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