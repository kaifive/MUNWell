const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LicenseSchema = new Schema({
    user: String,
    key: String,
    license: String,
    start: String,
    end: String
});

const License = mongoose.model('License', LicenseSchema)

module.exports = License