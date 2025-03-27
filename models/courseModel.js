const Datastore = require('nedb');
const courseDB = new Datastore({ filename: 'courses.db', autoload: true });

module.exports = courseDB;
