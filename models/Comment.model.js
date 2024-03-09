const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    lead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lead",
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor",
    },
    comment: {
        type: String,
    },
});

module.exports = mongoose.model("Comment", commentSchema);