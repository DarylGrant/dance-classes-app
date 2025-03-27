const userDB = require('../models/userModel');

exports.getLogin = (req, res) => {
    res.render('login', { title: 'Login' });
};

exports.postLogin = (req, res) => {
    const { username, password } = req.body;
    userDB.findOne({ username, password }, (err, user) => {
        if (user) {
            req.session.user = user;
            res.redirect('/dashboard');
        } else {
            res.render('login', { title: 'Login', error: 'Invalid credentials' });
        }
    });
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};
