// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Show login form
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

// Handle login POST request (this is just a sample, you might want to add actual logic)
router.post('/login', (req, res) => {
    // Here, you would check the username and password
    const { username, password } = req.body;
    console.log(username, password);  // Just for demonstration
    res.redirect('/courses');
});

module.exports = router;
