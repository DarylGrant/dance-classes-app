const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authController = require('../controllers/authController');

// Get all courses and show enroll form
router.get('/', courseController.getCourses);

// Enroll in a course
router.post('/enroll', courseController.enroll);

// Organiser specific routes
router.get('/add', authController.getAddCourse);
router.post('/add', authController.postAddCourse);
router.get('/edit/:id', authController.getEditCourse);
router.post('/edit/:id', authController.postEditCourse);
router.get('/delete/:id', authController.deleteCourse);
router.get('/participants/:id', authController.getCourseParticipants);

module.exports = router;
