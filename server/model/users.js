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
    zipcode: {
        type: String,
        required: true,
      },
    visited:{
        bid: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now(),
        }
      },
    isBusiness: {
        type: Boolean,
        required: true,
      },
});

module.exports = mongoose.model('Users', userSchema);