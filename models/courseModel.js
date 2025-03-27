const Datastore = require('nedb');
const db = new Datastore({ filename: 'courses.db', autoload: true });

module.exports = db;
