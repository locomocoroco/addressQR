const mongoose = require('../db');

const visitSchema = mongoose.Schema({
    bid: {
        type: String,
        required: true,
      },
    user: {
        _id: {
            type: String,
            required: true,
        },
        email: {
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
        isBusiness: {
            type: Boolean,
            required: true,
          },
    }
})

module.exports = mongoose.model('visit', visitSchema);