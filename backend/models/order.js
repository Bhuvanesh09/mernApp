const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let OrderModel = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    quantity: {
        type: String
    }
});

module.exports  = mongoose.model('Order', OrderModel)