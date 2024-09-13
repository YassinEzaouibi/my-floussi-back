 const express = require('express');
const sendEmail = require('../../service/mailSending');
const personalityAnalysis = require("../../service/personalityAnalysis");
 const path = require('path');
 const fs = require('fs');

const router = express.Router();

router.post('/send-result', async (req, res) => {
    const { email, subject, result } = req.body;

    const analysis = personalityAnalysis[result.currentPersonType] || {};

    const textContent = `Hello, your result is: ${result}`;
    const htmlContent = `
        <div style="width: 100%; max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #333;">
            <h1 style="color: #4CAF50; text-align: center;">Your Questionnaire Result</h1>
            <!-- Personality Type Card -->
            <div style="border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
                <h2 style="color: #333; margin-top: 0;">Your Personality Type</h2>
                <p style="font-size: 16px; color: #555;"><strong>Type:</strong> ${result.currentPersonType}</p>
            </div>
            <!-- Score Level Card -->
            <div style="border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
                <h2 style="color: #333; margin-top: 0;">Your Score Level</h2>
                <p style="font-size: 16px; color: #555;"><strong>Score Level:</strong> ${result.currentScoreLevel}</p>
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
    let imageDir;
    switch (result.currentPersonType) {
        case 'Prudent':
            imageDir = path.join(__dirname, '../../assets/graphs/prudent');
            break;
        case 'Modere':
            imageDir = path.join(__dirname, '../../assets/graphs/modere');
            break;
        case 'Dynamic':
            imageDir = path.join(__dirname, '../../assets/graphs/dynamic');
            break;
        case 'Agressif':
            imageDir = path.join(__dirname, '../../assets/graphs/agressif');
            break;
        default:
            return res.status(400).json({ error: `Invalid persona type: ${result.currentPersonType}` });
    }

    const imageFiles = fs.readdirSync(imageDir).filter(file => file.endsWith('.png'));

    const attachments = imageFiles.map((file, index) => ({
        filename: `graph${index + 1}.png`,
        path: path.join(imageDir, file)
    }));


    try {
        await sendEmail(email, subject, textContent, htmlContent, attachments);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
    }
});

module.exports = router;









