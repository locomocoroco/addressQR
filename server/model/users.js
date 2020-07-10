const mongoose = require('../db');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
      },
    zipCode: {
        type: String,
        required: true,
      },
    greeting: {
      type: String,
    },
    isBusiness: {
        type: Boolean,
        required: true,
      },
}, { timestamps: true});

module.exports = mongoose.model('Users', userSchema);