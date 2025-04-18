const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Show login form
router.get('/login', authController.getLogin);

// Handle login POST request
router.post('/login', authController.postLogin);

// Organiser dashboard route (after successful login)
router.get('/dashboard', authController.getDashboard);

// Logout handler
router.get('/logout', authController.logout);

// Show organiser list
router.get('/organiser-list', authController.getOrganiserList); 

// Add new organiser
router.get('/add-organiser', (req, res) => {
    res.render('add-organiser', { title: 'Add New Organiser' });
});
router.post('/add-organiser', authController.addOrganiser);

// Handle removal of an organiser
router.post('/remove-organiser/:id', authController.removeOrganiser);

// Remove user from course
router.get('/remove-user-from-course/:courseId/:userId', authController.removeUserFromCourse);

// Manage courses route
router.get('/manage-courses', authController.getManageCourses);

// Update course route
router.post('/update-course/:id', authController.updateCourse);

// Edit course route
router.get('/edit-course/:id', authController.getEditCourse);

// Delete course route
router.post('/delete-course/:id', authController.deleteCourse);

// Remove user route
router.get('/remove-user', authController.getRemoveUser);

// Remove user route
router.post('/remove-user/:id', authController.removeUser);

// Show the generate class list page
router.get('/generate-class-list', authController.getGenerateClassList);

module.exports = router;
