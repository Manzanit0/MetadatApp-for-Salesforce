'use strict';

const jsforce = require('jsforce');

const conn = new jsforce.Connection({
    loginUrl : 'https://login.salesforce.com' //TODO: parameter in request.
});


function connect(username, password){
    return new Promise((resolve, reject) => {
        conn.login(username, password, (error, userInfo) => {
            if(error) {
                console.log(error);
                reject(error);
            }
            else {
                resolve(userInfo);
            }
        });
    });
}

function createCustomFields(metadataJson){
    return new Promise((resolve, reject) => {
        conn.metadata.create('CustomField', metadataJson, (error, results) => {
            if(error) {
                console.log(error);
                reject(error);
            }
            else{
                resolve(results);
            }
        });
    });
}

module.exports.connect = connect;
module.exports.createCustomFields = createCustomFields;
