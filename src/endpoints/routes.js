'use strict';

const app = require('express');

const customfields = require('./customfields.endpoint.js');
const user = require('./user.endpoint.js');
const views = require('../web-ui/controllers/routes.js');

const routes = (app) => {
    app.use('/customfields', customfields);
    app.use('/users', user);

    //Web-UI routes
    app.use('', views); //TODO: is it correct to mix the API routes with the UI routes??
};

module.exports = routes;
