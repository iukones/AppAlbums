'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ImageSchema = Schema({
    title: String,
    picture: String,
    album: {
        type: Schema.ObjectId,
        ref: 'Album'
    }

})




module.exports = mongoose.model('Image', ImageSchema)
