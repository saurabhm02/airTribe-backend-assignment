const { JsonWebTokenError } = require("jsonwebtoken");
const Instructor = require("../models/Instructor.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwt_Secret = process.env.JWT_SECRET;


exports.signUp = async(req, res) => {
    try{
        const { firstName, lastName, email, password, cPassword } = req.body;

        if(!firstName || !lastName || !email || !password || !cPassword){
            return res.status(403).json({
                success: false,
                message: "All fields are required "
            });
        };

        if(password!== cPassword){
            return res.status(403).json({
                success: false,
                message: "Passwords do not match"
            });
        };

        const existingInstructor = await Instructor.findOne({email});
        if(existingInstructor){
            return res.status(400).json({
                success: false,
                message: "This email is already registered. Please use a different email address."
            }); 
        };

        const hashPassword = await bcrypt.hash(password, 10);
        
        const instructor = await Instructor.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
        });

        res.status(200).json({
            success: true,
            message: "Instructor registered succcessfully",
            instructor,
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Instructor cannot be registered!, Please try again",
        });
    }
};


exports.login = async(req, res) => {
    try{
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403).json({
              success: false,
              message: "All required fields must be provided. Please make sure you've filled out all mandatory fields correctly.",
            });
        }

        const instructor = await Instructor.findOne({ email });
        if(!instructor){
            return res.status(400).json({
                success: false,
                message: "Instructor not found"
            });
        }

        if(await bcrypt.compare(password, instructor.password)){
            const payload = {
                _id: instructor._id,
                email: instructor.email,
            }
            const token = jwt.sign(payload, jwt_Secret, {
                expiresIn: "2h",
            });

            instructor.token = token;
            instructor.password = undefined;
            
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                message: "Logged in successfully",
                token,
                instructor,
            })

        }
        else{
            return res.status(401).json({
                success: false,
                message: "password is incorrect!",
            });
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
        success: false,
        message: "instructor cannot login!, Please try again",
        });
    }
}