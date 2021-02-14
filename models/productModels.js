const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    detail: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    uploadAt: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model('Product', UserSchema);
module.exports = Product;