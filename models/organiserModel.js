const bcrypt = require('bcrypt');
const Datastore = require('nedb');
const organiserDB = new Datastore({ filename: 'organisers.db', autoload: true });

// Insert default organiser accounts if organisers.db is empty
organiserDB.count({}, (err, count) => {
    if (count === 0) {
        // Hash the default passwords before inserting them
        bcrypt.hash("admin123", 10, (err, hashedPassword) => {
            if (err) throw err;
            organiserDB.insert({ username: "admin", password: hashedPassword, role: "organiser" });
        });
        
        bcrypt.hash("password", 10, (err, hashedPassword) => {
            if (err) throw err;
            organiserDB.insert({ username: "darylg", password: hashedPassword, role: "organiser" });
        });
    }
});

module.exports = organiserDB;
