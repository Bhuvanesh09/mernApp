const mongoose = require("mongoose");

let ReviewModel = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    quantity: {
        type: String
    },
    status: {
        type: String
    }
});

module.exports  = mongoose.model('Review', ReviewModel)