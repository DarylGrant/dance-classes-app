const userDB = require('../models/userModel');

exports.isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/auth/login');
    }
};

exports.isNotAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return next();
    } else {
        res.redirect('/dashboard');
    }
};
