const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const courseDB = require('../models/courseModel');

router.get('/', courseController.getCourses);
router.post('/enroll', courseController.enroll);

// Function to check if courses exist before inserting
function initialiseCourses() {
    courseDB.find({}, (err, docs) => {
        if (err) {
            console.error("Error checking existing courses:", err);
            return;
        }

        if (docs.length > 0) {
            console.log("Courses already exist, skipping insertion.");
            return;
        }

        console.log("No courses found, inserting default courses...");

        const courses = [
            {
                name: "Ballet Basics",
                duration: "6 weeks",
                date: "2025-05-01",
                time: "09:30",
                description: "A beginner's course in ballet, focusing on posture, balance, and basic movements.",
                location: "Dance Studio A",
                price: "£150"
            },
            {
                name: "Contemporary Dance",
                duration: "8 weeks",
                date: "2025-05-10",
                time: "11:00",
                description: "Explore contemporary dance techniques with an emphasis on expression and fluid movement.",
                location: "Dance Studio B",
                price: "£200"
            },
            {
                name: "Street Dance",
                duration: "10 weeks",
                date: "2025-06-01",
                time: "14:00",
                description: "A high-energy class combining various street dance styles such as breakdancing, locking, and popping.",
                location: "Dance Studio C",
                price: "£180"
            },
            {
                name: "Salsa Dance",
                duration: "8 weeks",
                date: "2025-05-15",
                time: "17:00",
                description: "Learn the basics of Salsa dancing in this fun and social class.",
                location: "Dance Studio D",
                price: "£120"
            },
            {
                name: "Ballroom Dancing",
                duration: "6 weeks",
                date: "2025-05-05",
                time: "18:30",
                description: "A beginner’s course in ballroom dancing, covering styles like the waltz and tango.",
                location: "Dance Studio E",
                price: "£140"
            }
        ];

        courseDB.insert(courses, (insertErr, newDocs) => {
            if (insertErr) {
                console.error("Error inserting courses:", insertErr);
                return;
            }
            console.log(`Successfully inserted ${newDocs.length} courses.`);
        });
    });
}

initialiseCourses();

module.exports = router;
