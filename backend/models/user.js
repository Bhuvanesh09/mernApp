const mongoose = require('mongoose');

let UserModel = new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: String
    },
    productList: {
        type: Array
    },
    orderList: {
        type: Array
    }
});

module.exports = mongoose.model('User', UserModel);