const Datastore = require('nedb');
const userDB = new Datastore({ filename: 'users.db', autoload: true });

// Insert default organiser accounts if empty
userDB.count({}, (err, count) => {
    if (count === 0) {
        userDB.insert([
            { username: "admin", password: "admin123", role: "organiser" },
            { username: "darylg", password: "password", role: "organiser" }
        ]);
    }
});

module.exports = userDB;