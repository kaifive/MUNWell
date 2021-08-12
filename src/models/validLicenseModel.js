const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ValidLicenseSchema = new Schema({
    user: String,
    key: String,
    license: String,
    start: String,
    end: String
});

const ValidLicense = mongoose.model('ValidLicense', ValidLicenseSchema)

module.exports = ValidLicense