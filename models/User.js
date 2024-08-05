const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', "admin"],
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    questionnaire: [{
        type: Schema.Types.ObjectId,
        ref: 'QuestionnaireScoresTypes'
    }]
});

module.exports = User = mongoose.model(
    "user",
    UserSchema
)