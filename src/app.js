'use strict';

// External libs.
const express = require('express'),
         path = require('path'),
     mongoose = require('mongoose'),
   bodyParser = require('body-parser'), //Parse JSON in body request
     passport = require('passport'),
     Strategy = require('passport-http').BasicStrategy;

const userSchema = require('./models/user.model');
const User = mongoose.model('User', userSchema);

// Use native promises
mongoose.Promise = global.Promise;

// Express configuration.
const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'web-ui'))); // expose frontend.
require('./endpoints/routes.js')(app);

// Server and DB configuration.
const config = require('./config/server.config'),
          db = require('./config/db.config');

// Database connection handler.
mongoose.connect(db.mongoURI[app.settings.env], function(err, res) {
    if(err) {
        console.log('Error connecting to the database. ' + err);
    } else {
        console.log('Connected to Database: ' + db.mongoURI[app.settings.env]);
    }
});

// Authentication configuration.
passport.use(new Strategy(
    function(username, password, cb) {
        User.findOne({ username: username })
        .then(user => {
            if (!user) { return cb(null, false); }
            //TODO: implement some MD5 or SHA encryption.
            if (user.password !== password) { return cb(null, false); }
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
    }
));

// Init app.
app.listen(config.port, () => console.log('Metadatapp listening on port ' + config.port + '!\n'));

// Check DB connection.
setTimeout(() => {
    console.log('mongoose connection state: ' + mongoose.connection.readyState);
}, 5000);

module.exports = app;
