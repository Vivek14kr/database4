const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    marks: {
        type: Number,
        required: true
    },
    current_batch: {
        type: String,
        required: true
    },
    eval_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'evaluation',
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model('student', studentSchema);