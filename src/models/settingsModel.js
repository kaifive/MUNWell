const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SettingsSchema = new Schema({
    user: String,
    name: String,
    abbreviation: String,
    organization: String,
    secgen: String,
    start: String,
    end: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    logo: String,
    website: String,

    invoiceStreet: String,
    invoiceCity: String,
    invoiceState: String,
    invoiceZipcode: String,
    earlydelfee: String,
    earlyschoolfee: String,
    regdelfee: String,
    regschoolfee: String,
    latedelfee: String,
    lateschoolfee: String,
    terms: String
});

const Settings = mongoose.model('Setting', SettingsSchema)

module.exports = Settings