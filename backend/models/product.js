const mongoose = require("mongoose");

let ProductModel = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: Number
    },
    status: {
        type: String
    }
});

module.exports  = mongoose.model('Product', ProductModel)