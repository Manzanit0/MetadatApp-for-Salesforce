'use strict';

const app = require('express');

const customfields = require('./customfields.endpoint.js');

const routes = (app) => {
    app.use('/customfields', customfields);
};

module.exports = routes;
