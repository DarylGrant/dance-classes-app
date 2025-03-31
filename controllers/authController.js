const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const organiserDB = require('../models/organiserModel');
const courseDB = require('../models/courseModel');
const userDB = require('../models/userModel'); // Assuming you have a User model to manage users

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

        bcrypt.compare(password, organiser.password, (err, result) => {
            if (err) {
                return res.render('login', { title: 'Login', error: 'An error occurred. Please try again later.' });
            }

            if (result) {
                const payload = { username: organiser.username, role: organiser.role };
                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

                req.session.organiser = organiser;
                res.cookie('jwt', accessToken, { httpOnly: true });

                return res.redirect('/auth/dashboard');
            } else {
                return res.render('login', { title: 'Login', error: 'Invalid credentials' });
            }
        });
    });
};

// Logout handler
exports.logout = (req, res) => {
    res.clearCookie('jwt');
    req.session.destroy(() => {
        res.redirect('/');
    });
};

// Organiser dashboard (updated to include courses)
exports.getDashboard = (req, res) => {
    if (req.session.organiser) {
        // Fetch courses for the logged-in organiser
        courseDB.find({ organiserId: req.session.organiser._id }, (err, courses) => {
            if (err) {
                console.error("Error retrieving courses:", err);
                return res.status(500).send("Error retrieving courses.");
            }

            // Pass the courses to the dashboard view
            res.render('dashboard', {
                title: 'Organiser Dashboard',
                organiser: req.session.organiser,
                courses: courses || []  // Pass an empty array if no courses found
            });
        });
    } else {
        res.redirect('/auth/login');
    }
};

// Show add new course form
exports.getAddCourse = (req, res) => {
    res.render('add-course', { title: 'Add New Course' });
};

// Handle add new course POST request
exports.postAddCourse = (req, res) => {
    const { name, duration, date, time, description, location, price } = req.body;

    // Add organiserId to associate the course with the organiser
    courseDB.insert({ 
        name, 
        duration, 
        date, 
        time, 
        description, 
        location, 
        price, 
        students: [],
        organiserId: req.session.organiser._id // Link course to the organiser
    }, (err, newCourse) => {
        if (err) {
            return res.status(500).send("Error adding new course.");
        }
        res.redirect('/auth/dashboard');
    });
};

// Show course details and edit form
exports.getEditCourse = (req, res) => {
    const courseId = req.params.id;

    courseDB.findOne({ _id: courseId }, (err, course) => {
        if (err || !course) {
            return res.status(404).send("Course not found.");
        }
        res.render('edit-course', { title: 'Edit Course', course });
    });
};

// Handle edit course POST request
exports.postEditCourse = (req, res) => {
    const courseId = req.params.id;
    const { name, duration, date, time, description, location, price } = req.body;

    courseDB.update({ _id: courseId }, { $set: { name, duration, date, time, description, location, price } }, {}, (err, numReplaced) => {
        if (err) {
            return res.status(500).send("Error updating course.");
        }
        res.redirect('/auth/dashboard');
    });
};

// Handle delete course request
exports.deleteCourse = (req, res) => {
    const courseId = req.params.id;

    courseDB.remove({ _id: courseId }, {}, (err, numRemoved) => {
        if (err || numRemoved === 0) {
            return res.status(404).send("Course not found.");
        }
        res.redirect('/auth/dashboard');
    });
};

// Show course participants
exports.getCourseParticipants = (req, res) => {
    const courseId = req.params.id;

    courseDB.findOne({ _id: courseId }, (err, course) => {
        if (err || !course) {
            return res.status(404).send("Course not found.");
        }

        // Fetch participants from the 'students' array in the course
        const studentIds = course.students;

        // Assuming you have a User model to get student names
        userDB.find({ _id: { $in: studentIds } }, (err, students) => {
            if (err) {
                return res.status(500).send("Error retrieving participants.");
            }

            res.render('course-participants', {
                title: `Participants for ${course.name}`,
                course,
                students
            });
        });
    });
};

// Add new organiser
exports.addOrganiser = (req, res) => {
    const { username, password, role } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send("Error creating organiser.");
        }

        organiserDB.insert({ username, password: hashedPassword, role }, (err, newOrganiser) => {
            if (err) {
                return res.status(500).send("Error adding new organiser.");
            }
            res.redirect('/auth/dashboard');
        });
    });
};

// Remove organiser
exports.removeOrganiser = (req, res) => {
    const organiserId = req.params.id;

    organiserDB.remove({ _id: organiserId }, {}, (err, numRemoved) => {
        if (err || numRemoved === 0) {
            return res.status(404).send("Organiser not found.");
        }
        res.redirect('/auth/dashboard');
    });
};

// Remove user from course
exports.removeUserFromCourse = (req, res) => {
    const { courseId, userId } = req.params;

    courseDB.update({ _id: courseId }, { $pull: { students: userId } }, {}, (err, numReplaced) => {
        if (err) {
            return res.status(500).send("Error removing user from course.");
        }
        res.redirect(`/auth/course-participants/${courseId}`);
    });
};
