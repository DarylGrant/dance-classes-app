const Datastore = require('nedb');
const userDB = new Datastore({ filename: 'users.db', autoload: true });

module.exports = userDB;
