const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
        // unique: true,
      },
      email: {
        type: String,
        required: true,
        unique : true
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      profile: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    },
);



module.exports = mongoose.model('user', UserSchema);