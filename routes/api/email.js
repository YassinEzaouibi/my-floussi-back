// routes/email.js
const express = require('express');
const sendEmail = require('../../service/mailSending');

const router = express.Router();

router.post('/send-result', async (req, res) => {
    const { email, subject, result } = req.body;

    // Customize your email content here
    const textContent = `Hello, your result is: ${result}`;
    const htmlContent = `
    <h1>Your Questionnaire Result</h1>
    <p><strong>Type:</strong> ${result.personType}</p>
    <p><strong>Score Level:</strong> ${result.scoreLevel}</p>
  `;

    try {
        await sendEmail(email, subject, textContent, htmlContent);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
    }
});

module.exports = router;
