const mongoose = require("mongoose");
const { db } = require("../models/Lead.model");
require("dotenv").config();

const db_url = process.env.DATABASE_URL;

const dbConnect = async() => {
    mongoose.connect(db_url ,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Database connected successfully'))
    .catch((err) => {
        console.log("error in connecting database");
        console.log(err);
        process.exit(1);
    });
};

module.exports = dbConnect;