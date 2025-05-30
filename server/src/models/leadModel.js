const mongoose = require('mongoose')

const leadSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    emailAddress: {
        type: String,
        required: true
    },
    insuranceType: {
        type: String,
        required: true
    },
    insuranceSubType: {
        type: String,
    },
    location: {
        type: String
    },
}, {
    timestramps: true
})

module.exports = mongoose.model('Lead', leadSchema)