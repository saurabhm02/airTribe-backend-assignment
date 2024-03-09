const express = require("express");
const router = express.Router();

const { signUpInstructor, loginInstructor } = require("../controllers/Instructor");
const { createCourse, updateCourse, getAllCourses } = require("../controllers/Course");
const { registerLead, updateLeadStatus, searchLeads } = require("../controllers/Lead");
const { createComment } = require("../controllers/Comment");


// Instructor Routes
router.post('/instructor/signup', signUpInstructor);
router.post('/instructor/login', loginInstructor);

// Course Routes
router.post('/course', createCourse);
router.put('/course/:courseId', updateCourse);
router.get('/courses', getAllCourses);

// Lead Routes
router.post('/lead', registerLead);
router.put('/lead/:leadId', updateLeadStatus);
router.get('/leads', searchLeads);

// Comment Routes
router.post('/comment', createComment);

module.exports = router;