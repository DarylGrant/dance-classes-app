const organiserDB = require('../models/organiserModel');  // Use organisers.db

// Show login form
exports.getLogin = (req, res) => {
    res.render('login', { title: 'Organiser Login' });
};

// Handle login POST request
exports.postLogin = (req, res) => {
    const { username, password } = req.body;

    organiserDB.findOne({ username, password }, (err, organiser) => {
        if (err) {
            return res.render('login', { title: 'Login', error: 'An error occurred. Please try again later.' });
        }

        if (organiser) {
            req.session.organiser = organiser;  // Store the organiser in session
            return res.redirect('/organiser/dashboard');  // Corrected redirection to /organiser/dashboard
        }

        res.render('login', { title: 'Login', error: 'Invalid credentials' });
    });
};

// Logout handler
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};
