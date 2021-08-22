const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AllotmentsSchema = new Schema({
    user: String,
    delegation: String,
    delegationId: String,
    allotments: String
});

const Allotments = mongoose.model('Allotments', AllotmentsSchema)

module.exports = Allotments