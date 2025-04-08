const bcrypt = require('bcrypt');
const Datastore = require('nedb');
const organiserDB = new Datastore({ filename: 'organisers.db', autoload: true });

// Insert default organiser account if organisers.db is empty
organiserDB.count({}, (err, count) => {
    if (count === 0) {
        // Hash the default password before inserting
        bcrypt.hash("admin123", 10, (err, hashedPassword) => {
            if (err) throw err;
            organiserDB.insert({ username: "admin", password: hashedPassword, role: "organiser" });
        });
        
    }
});

module.exports = organiserDB;
