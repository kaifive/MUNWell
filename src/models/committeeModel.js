const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommitteeSchema = new Schema({
    user: String,
    division: String,
    category: String,
    type: String,
    committee: String,
    abbreviation: String,
    chair: String,
    positions: String,
    assignments: String
});

const Committee = mongoose.model('Committee', CommitteeSchema)

module.exports = Committee