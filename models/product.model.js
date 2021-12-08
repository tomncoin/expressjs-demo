var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String
});

var Product = mongoose.model('Product', schema, 'products');

module.exports = Product;