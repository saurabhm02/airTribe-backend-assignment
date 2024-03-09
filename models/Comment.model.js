const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    lead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lead",
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor",
        required: true,
    },
    comment: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
    },
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);
