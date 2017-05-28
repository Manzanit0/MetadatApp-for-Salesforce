'use strict';

const app = require('express');

const customfields = require('./customfields.endpoint.js');
const user = require('./user.endpoint.js');

const routes = (app) => {
    app.use('/customfields', customfields);
    app.use('/users', user);
};

module.exports = routes;
