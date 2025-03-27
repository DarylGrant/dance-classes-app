const userDB = require('../models/userModel');

exports.getLogin = (req, res) => {
    res.render('login', { title: 'Organiser Login' });
};

exports.postLogin = (req, res) => {
    const { username, password } = req.body;
    userDB.findOne({ username, password }, (err, organiser) => {
        if (organiser) {
            req.session.organiser = organiser;
            return res.redirect('/organiser');
        }
        res.render('login', { title: 'Login', error: 'Invalid credentials' });
    });
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};