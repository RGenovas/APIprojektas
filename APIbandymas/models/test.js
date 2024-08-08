const mongoose = require('mongoose')
const Schema = mongoose.Schema

// schema - dokumento struktūra
const blogSchema = new Schema({
    band: {type: String, required:true},
    title: {type: String, required:true},
    genre:{type:String, required:true},
    year:{type:Number,required:true},
    remaster:{type:String,required:false},
    serial:{type:String,required:true},
    img:{type:String, required:false},
    format:{type:String, required:true}
}, {timestamps: true})

// modelis - sukuria interface ryšiui su DB rinkiniu
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
