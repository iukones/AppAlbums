'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const AlbumSchema = Schema({
    title: String,
    description: String

})




module.exports = mongoose.model('Album', AlbumSchema)
