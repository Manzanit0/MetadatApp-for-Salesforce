'use strict';

const express = require('express'),
       router = express.Router(),
      multer  = require('multer'),
       upload = multer({ dest: 'uploads/' });
       
//TODO: find a way for multer to not create an "upload" each time the enpoint recieves a request.

const csvParser = require('../parser/csv-to-salesforce.js');

const getFieldsFromCSV = (req, res) => {
    if(req.file){
        csvParser.parseCustomFields(req.file.path)
          .then(salesforceMtdFile => {
              res.status(200).json({result: 'Data processed correctly', code: 200, data: salesforceMtdFile});
          })
          .catch(error =>{
              res.status(error.code).json({result: error.msg, code: error.code});
          });
    }
    else {
        res.status(400).json({result: 'There was no file sent.', code: 400});
    }
};

router.post('/', upload.single('csvfile'), getFieldsFromCSV);

module.exports = router;
