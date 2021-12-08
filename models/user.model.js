var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    avatar: String
});

var User = mongoose.model('User', schema, 'users');

module.exports = User;