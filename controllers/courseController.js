const db = require('../models/courseModel');

exports.getHome = (req, res) => {
    res.render('index', { title: 'Dance Organisation' });
};

exports.getCourses = (req, res) => {
    db.find({}, (err, courses) => {
        res.render('courses', { title: 'Courses', courses });
    });
};

exports.enroll = (req, res) => {
    const { name, course } = req.body;
    db.update({ name: course }, { $push: { students: name } }, {}, () => {
        res.redirect('/courses');
    });
};