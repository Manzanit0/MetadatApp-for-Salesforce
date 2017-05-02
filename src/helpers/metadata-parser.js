'use strict';

const customfieldSchema = require('../schemas/customfield.schema.js');

const csv = require('csvtojson'),
jsontoxml = require('jsontoxml'),
   lodash = require('lodash');

/**
 * Parses a generic CSV file to JSON.
 * @param  {Csv} inputFile csv file
 * @return {Array}         csv transformed to json
 */
function csvToJson(inputFile) {
    let metadataJson = [];

    return new Promise((resolve, reject) => {
        csv()
            .fromFile(inputFile)
            .on('json', (jsonObj) => {
                console.log(jsonObj);
                // Append the new field at the end of the file.
                metadataJson.push(jsonObj);
                console.log(metadataJson);
            })
            .on('done', (error) => {
                if(error){
                    reject(error);
                }
                else{
                    resolve(metadataJson);
                }
            });
    });
}

/**
 * Validates and parses the CustomFields CSV file to SFDC metadata xml.
 * @param  {Csv} inputFile CustomFields in CSV file.
 * @return {Xml}           CustomFields ready to upload to SFDC.
 */
function parseCustomFields(inputFile) {
    // XML file with Salesforce fields metadata.
    let salesforceMtd = '';

    return new Promise((resolve, reject) => {
        csv()
            .fromFile(inputFile)
            .on('json', (jsonObj) => {
                parseCustomField(jsonObj)
                    .then(xmlNode => {
                        // Append the new field at the end of the file.
                        salesforceMtd += '<fields>' + xmlNode + '</fields>' ; //TODO: Is there a better way to build the xml?
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
            .on('done', (error) => {
                if(error){
                    reject(error);
                }
                else{
                    resolve(salesforceMtd);
                }
            });
    });
}

/**
 * Validates and parses the SFDC CustomField metadata from json to xml.
 * @param  {Json} jsonRow CustomField metadata in Json format
 * @return {Xml}          CustomField metadata ready to insert in Salesforce
 */
function parseCustomField(jsonRow) {
    return new Promise((resolve, reject) => {

        if(jsonRow.fieldType !== undefined && isValidData(jsonRow, customfieldSchema[jsonRow.fieldType])){
            const customField = jsontoxml(jsonRow);
            //TODO: comprobar customField.
            resolve(customField);
        }
        else{
            reject({code:400, msg:'The current row doesnt match with the Salesforce metadata schema.'});
        }
    });
}

/**
 * Keeps only the variables that are in the selected Schema.
 * @param  {Object} data   Json to sanitaze
 * @param  {Object} schema Reference schema
 * @return {Object}        Sanitazed data
 */
function sanitazeMetadata(data, schema){
    return lodash.pick(lodash.defaults(data, schema), lodash.keys(schema));
}

//TODO: 1. Check that the keys are valid.
//TODO: 2. Check that the values corresponding to enums are valid.
//TODO: 3. Check that it has all he compulsory properties.
/**
 * Sanitazes the input and then validates that it has the schema's properties.
 * @param  {Object} data   Object to validate
 * @param  {Object} schema Reference schema
 * @return {Boolean}       True if it's valid, false if not.
 */
function isValidData(data, schema){
    // First we sanitaze the data.
    data = sanitazeMetadata(data, schema);

    // Now we check it has all the key fields.
    for (var property in data) {
        if (!schema.hasOwnProperty(property)) {
           return false;
        }
    }

    return true;
}

module.exports.parseCustomFields = parseCustomFields;
module.exports.csvToJson = csvToJson;
