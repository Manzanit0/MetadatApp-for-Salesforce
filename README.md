# MetadatApp-for-Salesforce

### Get CustomFields metadata XML
Sending a request with a csv file called "csvfile" in the body to the endpoint
```
http://localhost:3000/customfields/get
```
will retrieve the CustomField metadata xml.

----

### Insert CustomFields in SFDC org
Sending a request with a csv file called "csvfile" in the body and your credentials in the header to the endpoint
```
http://localhost:3000/customfields/create
```
will directly insert the CustomFields in the SFDC organization.

----

The information in the csv must be like the SFDC metadata schema, see in the code or in the documentation:
* src/schemas/customfield.schema.js
* https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/customfield.htm

### Supported FieldTypes
- [ ] AutoNumber
- [ ] Lookup
- [ ] MasterDetail
- [ ] MetadataRelationship
- [x] Checkbox
- [ ] Currency
- [ ] Date
- [ ] DateTime
- [x] Email
- [ ] EncryptedText
- [ ] Note
- [ ] IndirectLookup
- [ ] ExternalLookup
- [x] Number
- [ ] Percent
- [ ] Phone
- [ ] Picklist
- [ ] MultiselectPicklist
- [ ] Summary
- [x] Text
- [x] TextArea
- [x] LongTextArea
- [ ] Summary
- [ ] Url
- [ ] Hierarchy
- [ ] File
- [ ] CustomDataType
- [ ] Html
- [ ] Geolocation

### Backlog
* Transpiler -> Apex -> Formula field
