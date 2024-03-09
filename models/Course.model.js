const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },
    courseDescription: {
        type: String,
        required: true,
        trim: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor",
        required: true,
    },
    whatYouWillLearn: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    max_seats: {
        type: Number,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },

});
module.exports = mongoose.model("Course", courseSchema);