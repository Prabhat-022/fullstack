const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: 'string',
    email: 'string',
    password: 'string'
})

const user = mongoose.model('user', userSchema)
module.exports = userSchema;