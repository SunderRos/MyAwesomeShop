const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    checkbox:{
        type: Boolean,
        required: true
    },
    admin: {
        type: Boolean,
        required: true,
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;