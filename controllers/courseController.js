const db = require('../models/courseModel');
const userDB = require('../models/userModel'); 

// Get all courses
exports.getCourses = (req, res) => {
    db.find({}, (err, courses) => {
        res.render('courses', { title: 'Courses', courses });
    });
};

// Enroll a user in a course and store the user in the users.db
exports.enroll = (req, res) => {
    const { name, email, course } = req.body;

    // Insert user data into users.db
    userDB.insert({ name, email, course }, (err) => {
        if (err) {
            console.error("Error inserting user into users.db", err);
        }
        res.redirect('/courses');
    });
};
