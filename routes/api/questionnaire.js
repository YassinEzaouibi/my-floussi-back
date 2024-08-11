const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const verifyAdminRole = require("../../middleware/verifyAdminRole");
const QuestionnaireScoresTypes = require("../../models/QuestionnaireScoresTypes");
const User = require("../../models/User");
const GoogleUser = require("../../models/UserGoogleSchema");

// add a questionnaire to a user
router.post("/:id/questionnaire", verifyToken, async (req, res) => {
    const {score, type} = req.body;
    const userId = req.params.id;

    try {
        const newQuestionnaireResult = new QuestionnaireScoresTypes({score, type});
        await newQuestionnaireResult.save();

        let user = await User.findById(userId);
        if (!user) {
            user = await GoogleUser.findById(userId);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
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
        let user = await User.findById(userId).populate('questionnaire');
        if (!user) {
            user = await GoogleUser.findById(userId).populate('questionnaire');
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
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
        const usersQuestionnaires = await User.find().populate('questionnaire');
        const googleUsersQuestionnaires = await GoogleUser.find().populate('questionnaire');
        const allQuestionnaires = [...usersQuestionnaires, ...googleUsersQuestionnaires];
        if (!allQuestionnaires.length) {
            return res.status(404).json({ message: 'No users found' });
        }
        const questionnaires = allQuestionnaires.map(user => user.questionnaire).flat();
        res.json(questionnaires);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
