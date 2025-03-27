const express = require('express');
const router = express.Router();

// Handle the GET request for the /courses route
router.get('/', (req, res) => {
    // Example courses data
    const courses = [
        { name: 'Ballet', duration: 6 },
        { name: 'Hip-Hop', duration: 8 },
    ];
    // Render the courses page with data
    res.render('courses', { title: 'Available Courses', courses });
});

module.exports = router;
