'use strict';

const express = require('express'),
       router = express.Router(),
         path = require('path');

 //TODO: is it correct to mix the API routes with the UI routes??
router.get('/login', function(req, res) {
     // load the single view file (angular will handle the page changes on the front-end)
    res.sendFile('login.html', { root: path.join(__dirname, '../web-ui/login/') }); 
});

router.get('/panel', function(req, res) {console.log(__dirname);
    res.sendFile('insert-metadata.html', { root: path.join(__dirname, '../web-ui/dashboard/') }); 
});

module.exports = router;