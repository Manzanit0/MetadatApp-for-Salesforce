# MetadatApp-for-Salesforce

### Only some pilot functionality availiable
POST a csv with metadata information -> responds with SFDC metadata xml

To test the application:

```
npm start
```
And then just send a POST request with a csv to:
```
http://localhost:3000/customfields/
```
The information in the csv must be like the schema src/schemas/customfield.schema.js
