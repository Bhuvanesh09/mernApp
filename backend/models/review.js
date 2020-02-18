const mongoose = require("mongoose");

let ReviewModel = mongoose.Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    quantity: {
        type: String
    },
    status: {
        type: String
    }
});

module.export  = mongoose.model('Review', ReviewModel)