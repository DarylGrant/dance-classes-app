const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const organiserDB = require('../models/organiserModel');  // Use organisers.db

// Show login form
exports.getLogin = (req, res) => {
    res.render('login', { title: 'Organiser Login' });
};

// Handle login POST request
exports.postLogin = (req, res) => {
    const { username, password } = req.body;

    organiserDB.findOne({ username }, (err, organiser) => {
        if (err) {
            return res.render('login', { title: 'Login', error: 'An error occurred. Please try again later.' });
        }

        if (!organiser) {
            return res.render('login', { title: 'Login', error: 'Invalid credentials' });
        }

        // Compare provided password with the stored hashed password
        bcrypt.compare(password, organiser.password, (err, result) => {
            if (err) {
                return res.render('login', { title: 'Login', error: 'An error occurred. Please try again later.' });
            }

            if (result) {
                // Generate a JWT token with the organiser's information
                const payload = { username: organiser.username, role: organiser.role };
                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                
                // Set the session organiser variable for dashboard access
                req.session.organiser = organiser;

                // Store the token in a cookie
                res.cookie('jwt', accessToken, { httpOnly: true });

                // Redirect to the dashboard route mounted under /auth
                return res.redirect('/auth/dashboard');
            } else {
                return res.render('login', { title: 'Login', error: 'Invalid credentials' });
            }
        });
    });
};

// Logout handler
exports.logout = (req, res) => {
    res.clearCookie('jwt');  // Clear the JWT cookie
    req.session.destroy(() => {
        res.redirect('/');
    });
};

// Middleware to verify JWT
exports.verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;  // Get the token from the cookies

    if (!token) {
        return res.redirect('/auth/login');  // Redirect to login if no token is found
    }

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.redirect('/auth/login');  // Redirect to login if token is invalid
        }

        // Store the decoded data in the request object
        req.user = decoded;
        next();
    });
};
