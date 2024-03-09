const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    cPassword: {
        type: String,
        required: true,
        trim: true,
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ]
}, {timeStamps: true} );

module.exports = mongoose.model("Instructor", instructorSchema);