// routes/email.js
const express = require('express');
const sendEmail = require('../../service/mailSending');
const personalityAnalysis = require("../../service/personalityAnalysis");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post('/send-result', async (req, res) => {
    const { email, subject, result } = req.body;

    const analysis = personalityAnalysis[result.personType] || {};

    const textContent = `Hello, your result is: ${result}`;
    const htmlContent = `
  <div style="width: 100%; max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #333;">
    <h1 style="color: #4CAF50; text-align: center;">Your Questionnaire Result</h1>

    <!-- Personality Type Card -->
    <div style="border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
      <h2 style="color: #333; margin-top: 0;">Your Personality Type</h2>
      <p style="font-size: 16px; color: #555;"><strong>Type:</strong> ${result.personType}</p>
    </div>

    <!-- Score Level Card -->
    <div style="border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
      <h2 style="color: #333; margin-top: 0;">Your Score Level</h2>
      <p style="font-size: 16px; color: #555;"><strong>Score Level:</strong> ${result.scoreLevel}</p>
    </div>

    <!-- Tolerance Risk Card -->
    <div style="border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
      <h2 style="color: #333; margin-top: 0;">Tolerance Risk</h2>
      <p style="font-size: 16px; color: #555;"><strong>Tolerance Risk:</strong> ${analysis.toleranceRisk || 'N/A'}</p>
    </div>

    <!-- Objectives Card -->
    <div style="border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
      <h2 style="color: #333; margin-top: 0;">Objectives</h2>
      <p style="font-size: 16px; color: #555;"><strong>Objectives:</strong> ${analysis.objectives || 'N/A'}</p>
    </div>

    <!-- Investment Strategy Card -->
    <div style="border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
      <h2 style="color: #333; margin-top: 0;">Investment Strategy</h2>
      <p style="font-size: 16px; color: #555;"><strong>Investment Strategy:</strong> ${analysis.investmentStrategy || 'N/A'}</p>
    </div>

    <!-- Investment Horizon Card -->
    <div style="border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
      <h2 style="color: #333; margin-top: 0;">Investment Horizon</h2>
      <p style="font-size: 16px; color: #555;"><strong>Investment Horizon:</strong> ${analysis.investmentHorizon || 'N/A'}</p>
    </div>

    <!-- Profile Card -->
    <div style="border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
      <h2 style="color: #333; margin-top: 0;">Profile</h2>
      <p style="font-size: 16px; color: #555;"><strong>Profile:</strong> ${analysis.profile || 'N/A'}</p>
    </div>
  </div>
`;

    try {
        await sendEmail(email, subject, textContent, htmlContent);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
    }
});

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADMIN,
        pass: process.env.PASSWORD_THIRD_APP,
    },
});

router.post('/contact', (req, res) => {
    const { 'first-name': firstName, 'last-name': lastName, email, 'phone-number': phoneNumber, message } = req.body;

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_ADMIN,
        subject: `Contact Form Submission from ${firstName} ${lastName}`,
        html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #007bff;
            color: #ffffff;
            padding: 10px;
            border-radius: 8px 8px 0 0;
            text-align: center;
          }
          .content {
            padding: 20px;
          }
          .content h2 {
            color: #333333;
          }
          .content p {
            font-size: 16px;
            line-height: 1.5;
            color: #555555;
          }
          .footer {
            text-align: center;
            padding: 10px;
            background-color: #f1f1f1;
            border-radius: 0 0 8px 8px;
          }
          .footer p {
            font-size: 14px;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Contact Form Submission</h1>
          </div>
          <div class="content">
            <h2>New message from ${firstName} ${lastName}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phoneNumber}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
          <div class="footer">
            <p>Thank you for reaching out!</p>
          </div>
        </div>
      </body>
    </html>
  `,
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Failed to send message.' });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Message sent successfully!' });
    });
});

module.exports = router;
