const mongoose = require('mongoose')

const QuestionnaireScoresTypes = new mongoose.Schema({
    score: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("QuestionnaireScoresTypes", QuestionnaireScoresTypes);