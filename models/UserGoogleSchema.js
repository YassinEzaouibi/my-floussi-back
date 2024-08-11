const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const UserGoogleSchema = new Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    picture: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user'],
        require: true
    },
    questionnaire: [{
        type: Schema.Types.ObjectId,
        ref: 'QuestionnaireScoresTypes'
    }]
});

module.exports = User = mongoose.model(
    "userGoogle",
    UserGoogleSchema
)

// module.exports = mongoose.models.UserGoogle || mongoose.model("UserGoogle", UserGoogleSchema);