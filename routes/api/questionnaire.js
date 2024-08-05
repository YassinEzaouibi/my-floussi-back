const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const verifyAdminRole = require("../../middleware/verifyAdminRole");
const QuestionnaireScoresTypes = require("../../models/QuestionnaireScoresTypes");
const User = require("../../models/User");

// add a questionnaire to a user
router.post("/:id/questionnaire", verifyToken, async (req, res) => {
    const {score, type} = req.body;
    const userId = req.params.id;

    try {
        const newQuestionnaireResult = new QuestionnaireScoresTypes({score, type});
        await newQuestionnaireResult.save();

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Assuming the user model has a 'questionnaires' field that is an array
        user.questionnaire.push(newQuestionnaireResult._id);

        await user.save();

        res.json({ message: "Questionnaire added successfully", user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// get questionnaire by id
router.get('/questionnaire/:id', async (req, res) => {
    try{
        const questionnaire = await QuestionnaireScoresTypes.findById(req.params.id);
        if(!questionnaire){
            return res.status(404).json({
                message: "Questionnaire not found"
            })
        }
        res.json(questionnaire);
    }catch (error){
        console.error(error);
        res.status(500).send('server error')
    }
})

// get all questionnaires by id user
router.get('/:id/questionnaires', verifyToken, async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId).populate('questionnaire');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.questionnaire);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// get all questionnaires
router.get('/questionnaires', verifyToken, verifyAdminRole, async (req, res) => {
    try {
        const users = await User.find().populate('questionnaire');
        if (!users.length) {
            return res.status(404).json({ message: 'No users found' });
        }
        const questionnaires = users.map(user => user.questionnaire).flat();
        res.json(questionnaires);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
