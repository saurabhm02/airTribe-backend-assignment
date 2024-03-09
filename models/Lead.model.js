const mongoose = require("mongoose");
const leadSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    phone: {
        type: String, 
        required: true,
    },
    linkedInProfile: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Waitlisted", "Accepted", "Rejected"],
        default: "Pending",
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        }
    ]
});
module.exports = mongoose.model("Lead", leadSchema);