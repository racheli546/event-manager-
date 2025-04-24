const mongoose = require('mongoose');
const producerSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        // required: true,
    },
    address: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    }],
}
// , { timestamps: true }
);
module.exports = mongoose.model('Producer', producerSchema);