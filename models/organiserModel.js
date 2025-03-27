const Datastore = require('nedb');
const organiserDB = new Datastore({ filename: 'organisers.db', autoload: true });

// Insert default organiser accounts if organisers.db is empty
organiserDB.count({}, (err, count) => {
    if (count === 0) {
        organiserDB.insert([
            { username: "admin", password: "admin123", role: "organiser" },
            { username: "darylg", password: "password", role: "organiser" }
        ]);
    }
});

module.exports = organiserDB;
