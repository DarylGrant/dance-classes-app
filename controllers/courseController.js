const db = require('../models/courseModel');

exports.getCourses = (req, res) => {
    db.find({}, (err, courses) => {
        res.render('courses', { title: 'Courses', courses });
    });
};

exports.enroll = (req, res) => {
    const { name, email, course } = req.body;
    db.update({ name: course }, { $push: { students: { name, email } } }, {}, (err) => {
        res.redirect('/courses');
    });
};