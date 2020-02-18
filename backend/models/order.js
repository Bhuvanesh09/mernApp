const mongoose = require("mongoose");

let OrderModel = mongoose.Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    userId: {
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

module.export  = mongoose.model('Order', OrderModel)