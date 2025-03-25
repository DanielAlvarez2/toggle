const mongoose = require('mongoose')

const IPSchema = new mongoose.Schema({
    IPaddress:{
        type:String,
        unique:true
    }
})
module.exports = mongoose.model('IP', IPSchema)