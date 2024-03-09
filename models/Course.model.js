const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor",
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    masSeats: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },

});
module.exports = mongoose.model("Course", courseSchema);