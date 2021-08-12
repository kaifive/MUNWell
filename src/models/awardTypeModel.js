const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AwardTypeSchema = new Schema({
    user: String,
    type: String,
    value: Number
});

const AwardType = mongoose.model('AwardType', AwardTypeSchema)

module.exports = AwardType