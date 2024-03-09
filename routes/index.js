const express = require("express");
const router = express.Router();

const { signUpInstructor, loginInstructor } = require("../controllers/Instructor");
const { createCourse, updateCourse, getAllCourses } = require("../controllers/Course");
const { registerLead, updateLeadStatus, searchLeads } = require("../controllers/Lead");
const { createComment } = require("../controllers/Comment");
const { auth } = require("../middlewares/auth");


// Instructor Routes
router.post('/instructor/signup', signUpInstructor);
router.post('/instructor/login', loginInstructor);

// Course Routes
router.post('/createCourse', auth, createCourse);
router.put('/course/:courseId', updateCourse);
router.get('/getAllcourses', getAllCourses);

// Lead Routes
router.post('/registerLead', registerLead);
router.put('/lead/:leadId', updateLeadStatus);
router.get('/searchLead', searchLeads);

// Comment Routes
router.post('/leads/:leadId/createComment', createComment);


module.exports = router;