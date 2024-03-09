const jwt = require("jsonwebtoken");
const Instructor = require("../models/Instructor.model");
require("dotenv").config();
const jwt_Secret = process.env.JWT_SECRET;

exports.auth = async (req, res, next) => {
    try {
        let token = req.cookies.token || req.body.token || req.header("Authorization");

        console.log("Token:", token); 

        if (!token) {
            return res.status(403).json({
                success: false,
                message: "Token is missing or invalid",
            });
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7).trim();
        }

        try {
            const decoded = jwt.verify(token, jwt_Secret);
            console.log("Decoded:", decoded); 
            req.instructor = decoded;
            next();
        } catch (error) {
            return res.status(403).json({
                success: false,
                message: "Token is invalid",
            });
        }
    } catch (error) {
        console.log("Error while authenticating", error);
        res.status(500).json({
            success: false,
            message: "Some error occurred while authenticating the Instructor",
        });
    }
};
