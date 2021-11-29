const mongoose = require("mongoose")

const evaluationSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },

    user_id: {
        //mongo_id for doc in the users collections
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    topic_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'topic',
        required: true,
    }, ],
}, {
    versionKey: false,
    timestamps: true,
});
module.exports = mongoose.model('evaluation', evaluationSchema);