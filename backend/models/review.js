const mongoose = require("mongoose");

let ReviewModel = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    rating: {
        type: Number
    },
    review: {
        type: String
    }
});

module.exports  = mongoose.model('Review', ReviewModel)