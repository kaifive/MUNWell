const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IndividualAwardModel = new Schema({
    user: String,
    committee: String,
    type: String,
    position: String,
    delegation: String,
    delegate1: String,
    delegate2: String
});

const IndividualAward = mongoose.model('IndividualAward', IndividualAwardModel)

module.exports = IndividualAward