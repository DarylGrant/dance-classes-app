const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Get all courses and show enroll form
router.get('/', courseController.getCourses);

// Enroll in a course
router.post('/enroll', courseController.enroll);

module.exports = router;
