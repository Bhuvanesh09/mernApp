const mongoose = require('mongoose');


const connectDatabase = () =>  {
    // Connection to mongodb
    mongoose.connect('mongodb://127.0.0.1:27017/mallapp', { useNewUrlParser: true });
    const connection = mongoose.connection;
    connection.once('open', function() {
        console.log("MongoDB database connection established succesfully.");
    })
}


module.exports = connectDatabase;
