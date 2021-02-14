const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    postAt: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

const UserComment = mongoose.model('UserComment', UserSchema);
module.exports = UserComment;