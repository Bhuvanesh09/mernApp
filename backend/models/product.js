const mongoose = require("mongoose");

let ProductModel = mongoose.Schema({
    name: {
        type: String
    },
    reqQuant: {
        type: Number
    },
    currentQuant: {
        type: Number
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: Number
    }
});

module.export  = mongoose.model('Product', ProductModel)