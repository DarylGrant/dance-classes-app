const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Show login form
router.get('/login', authController.getLogin);

// Handle login POST request
router.post('/login', authController.postLogin);

// Organiser dashboard route (after successful login)
// Because these routes are mounted under /auth (per your index.js),
// this route will be accessible as /auth/dashboard
router.get('/dashboard', (req, res) => {
    if (req.session.organiser) {
        res.render('dashboard', { title: 'Organiser Dashboard', organiser: req.session.organiser });
    } else {
        res.redirect('/auth/login');
    }
});

// Logout handler
router.get('/logout', authController.logout);

module.exports = router;
