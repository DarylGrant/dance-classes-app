const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const path = require('path');
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

// Set up Mustache as the template engine
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true
}));

// Root route to render the home page
app.get('/', (req, res) => {
    res.render('index', { title: 'Dance Fusion' });
});

// Add the routes
app.use('/courses', courseRoutes); // Routes for courses
app.use('/auth', authRoutes); // Routes for authentication

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
