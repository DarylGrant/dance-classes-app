const jwt = require('jsonwebtoken');

exports.isAuthenticated = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.redirect('/auth/login');  // Redirect to login if no token is found
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.redirect('/auth/login');  // Redirect to login if token is invalid
        }

        req.user = decoded;  // Store the decoded token data
        next();
    });
};

exports.isNotAuthenticated = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return next();
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return next();
        }

        res.redirect('/organiser/dashboard');  // Redirect to dashboard if token is valid
    });
};
