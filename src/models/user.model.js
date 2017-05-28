'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username:  { type: String, index: true },
  password: String,
  email: { type: String, index: true },
});

module.exports = userSchema;
