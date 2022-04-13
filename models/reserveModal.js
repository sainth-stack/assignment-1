const mongoose = require('mongoose');
const reserveSchema = mongoose.Schema({
    trainName: {
        type: String,
        require: true
    },
    trainNum: {
        type: Number,
        require: true
    }
})
const ReserveData = mongoose.model('reservecollections',reserveSchema)
module.exports = ReserveData