'use strict';

const app = require('express');

const customfields = require('./customfields.endpoint.js');
const user = require('./user.endpoint.js');
const views = require('./frontend.routes.js');

const routes = (app) => {
    app.use('/customfields', customfields);
    app.use('/users', user);
    app.use('', views);
};

module.exports = routes;