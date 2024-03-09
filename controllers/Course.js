const Course = require("../models/Course.model");
const Instructor = require("../models/Instructor.model");

exports.createCourse = async(req, res) => {
    try{
        const { courseName, courseDescription , whatYouWillLearn, price, max_seats, start_date } = req.body;
        if( !courseName || !courseDescription || !whatYouWillLearn || !price || !max_seats || !start_date){
           return res.status(403).json({
                success: false,
                message: "Please fill all the fields.",
           });
        }

        const instructorId = req.instructor.id;
        console.log("instructor id: ", instructorId);

        if (!instructorId) {
            return res.status(404).json({
                success: false,
                message: "Instructor ID not found in request.",
            });
        }

        // const instructorDetails = await Instructor.findById({instructorId});

        // console.log("instructorDetails", instructorDetails);

        // if(!instructorDetails){
        //     return res.status(404).json({
        //         success: false, 
        //         message: "Instructor Details not found",
        //     });
        // }

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            instructor: instructorId,
            max_seats,
            start_date,
        });

        await Instructor.findByIdAndUpdate(
            instructorId , {
                $push: {
                    courses: newCourse._id,
                }
            }, {
                new: true
            },
        );

        return res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: newCourse
        });
    }
    

    catch(error){
        console.log("error in creating course: ", error);
        res.status(500).send({
            success: false,
            message: error.message || "Some error occurred while creating the Course."
        });
    };
};

exports.updateCourse = async(req, res) =>{
    try{
        const { courseId, courseName, max_seats, start_date  } = req.body;

        if( !courseId || !courseName || !max_seats || !start_date){
            return res.status(403).json({
                success: false,
                message: "Please fill all the fields.",
            });
        }

        const updatedcourse = await Course.findByIdAndUpdate(courseId, {
            courseName,
            max_seats,
            start_date,
        },
        {
            new: true
        });

        return res.status(200).json({
            success: true,
            message: "course updated successfully! ",
            updatedcourse,
        });

    }
    catch(error){
        console.log("error in updating: ", error);
        return res.status(400).json({
            success: false,
            message: error.message || "error occurs while updating the course, please try again!",
        });
    }
}

exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({}, {
            courseName: true,
            courseDescription: true,
            whatYouWillLearn: true,
            price: true,
            instructor: true,
            max_seats: true,
            start_date: true,
        }).populate("instructor").exec();

        return res.status(200).send({
            success: true,
            message: "Successfully fetched data of all the courses!",
            data: allCourses
        });
    } catch (error) {
        console.log("error in getting all courses: ", error);
        res.status(500).send({
            success: false,
            message: error.message || "Some error occurred while getting the courses."
        });
    }
};