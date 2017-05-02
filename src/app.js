'use strict';

// External libs.
const express = require('express');

// Express configuration.
const app = express();

require('./endpoints/routes.js')(app);

// Server configuration.
const config = require('./config/server.config');

// Init app.
app.listen(config.port, () => console.log('Metadatapp listening on port ' + config.port + '!\n'));

module.exports = app;
