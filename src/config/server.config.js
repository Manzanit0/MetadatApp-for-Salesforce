'use strict';

const config = {
    port: process.env.NODE_ENV === 'development' ? 4000 : 3000,
    url: 'localhost',
    env: process.env.ENV === 'development' ? 'development' : 'test'
};

module.exports = config;
