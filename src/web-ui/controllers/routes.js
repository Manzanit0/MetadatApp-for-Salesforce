'use strinct';

const express = require('express'),
         path = require('path'),
       router = express.Router();

router.get('/login', function(req, res) {
    res.sendFile('login.html', { root: path.join(__dirname, '../views/') }); 
});

router.get('/panel', function(req, res) {console.log(__dirname);
     // load the single view file (angular will handle the page changes on the front-end)
    res.sendFile('insert-metadata.html', { root: path.join(__dirname, '../views/') }); 
});

module.exports = router;