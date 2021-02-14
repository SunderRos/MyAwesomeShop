const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        require: true
    },
    productName: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    purchasedAt: {
        type: String,
        required: true
    }
});

const UserHistoryPurchase = mongoose.model('UserHistoryPurchase', UserSchema);
module.exports = UserHistoryPurchase;