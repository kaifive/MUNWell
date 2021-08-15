const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RegistrationDataSchema = new Schema({
    id: String,
    user: String,
    type: String,
    division: String,
    delegation: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    contact: String,
    email: String,
    phone: String,
    delegates: Number,
    status: String,
    window: String
});

const RegistrationData = mongoose.model('RegistrationData', RegistrationDataSchema)

module.exports = RegistrationData