
/**
 * Salesforce Text CustomField metadata.
 * @type {Object}
 */
const textField = {
    type: 'Text',
    label: null,
    length: 100,
    fullName: null,
    description: null,
    inlineHelpText: null,
    required: false,
    unique: false,
    caseSensitive: false,
    externalId: false
};

/**
 * Salesforce Text Area CustomField metadata.
 * @type {Object}
 */
const textAreaField = {
    type: 'TextArea',
    label: null,
    fullName: null,
    description: null,
    inlineHelpText: null,
    required: false
};

/**
 * Salesforce Long Text Area CustomField metadata.
 * @type {Object}
 */
const longTextAreaField = {
    type: 'LongTextArea',
    label: null,
    fullName: null,
    description: null,
    inlineHelpText: null,
    visibleLines: 25
};

/**
 * Salesforce Checkbox CustomField metadata.
 * @type {Object}
 */
const checkboxField = {
    type: 'Checkbox',
    label: null,
    defaultValue: false,
    fullName: null,
    description: null,
    inlineHelpText: null,
};

/**
 * Salesforce Number CustomField metadata.
 * @type {Object}
 */
const numberField = {
    type: 'Number',
    label: null,
    length: 100, //TODO: maximum length must be <= 18. Server responsability?
    precision: 0,
    fullName: null,
    description: null,
    inlineHelpText: null,
    required: false,
    unique: false,
    externalId: false
};

const emailField = {
    type: 'Email',
    label: null,
    fullName: null,
    description: null,
    inlineHelpText: null,
    required: false,
    unique: false,
    externalId: false
};

//TODO: add new customfield types.
//TODO: https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_field_types.htm
//TODO: https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/customfield.htm

module.exports.textfield = textField;
module.exports.textAreaField = textAreaField;
module.exports.longTextAreaField = longTextAreaField;
module.exports.checkboxField = checkboxField;
module.exports.numberfield = numberField;
module.exports.emailField = emailField;
