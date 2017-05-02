'use strict';

const express = require('express'),
       router = express.Router(),
      multer  = require('multer'),
       upload = multer({ dest: 'uploads/' });

//TODO: find a way for multer to not create an "upload" each time the enpoint recieves a request.

const metaParser = require('../helpers/metadata-parser.js'),
     salesforce = require('../helpers/salesforce.js');

const getFieldsFromCSV = (req, res) => {
    if(req.file){
        metaParser.parseCustomFields(req.file.path)
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

const createFieldsFromCSV = (req, res) => {
    //TODO: use AccessToken to avoid connecting every time.
    salesforce.connect(req.get('username'), req.get('password')+req.get('securityToken'))
        .then(userInfo => {
            //TODO: check if req.file.path exists
            metaParser.csvToJson(req.file.path)
                .then(customFields => {
                    salesforce.createCustomFields(customFields)
                        .then(results => {
                            res.status(200).json({result: 'Data processed correctly', code: 200, data: results});
                        })
                        .catch(error => {
                            res.status(500).json({result: 'Failed to insert the fields', code: 500});
                        });
                })
                .catch(error => {
                    res.status(422).json({result: 'Failed to parse the file', code: 422});
                });
        })
        .catch(error => {
            console.log(error); //TODO: Propagate error message?
            res.status(401).json({result: 'Failed to connect to Salesforce', code: 401});
        });
};

//TODO: check up on some proper endpoint names
router.post('/get', upload.single('csvfile'), getFieldsFromCSV);
router.post('/create', upload.single('csvfile'), createFieldsFromCSV);

module.exports = router;
