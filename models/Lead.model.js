const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
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
    contactNumber: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Waitlisted", "Accepted", "Rejected"],
    },
});

module.exports = mongoose.model("Lead", leadSchema);