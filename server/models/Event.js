const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    id: String,
    title: String,
    date: String,
    description: String,
    payment: String,
    producerEmail: String,
    producerName: String,
    producerPhone: String,
});

module.exports = mongoose.model('Event', eventSchema);
