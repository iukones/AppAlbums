'use strict'

const Album = require('../models/albumModels')



function getAlbum(req, res) {
    let albumId = req.params.albumId

    Album.findById(albumId, (err, album) => {
        if(err) return res.status(500).send({
            message: `Error al realizar la petición: ${err}`
        })
        if(!album) return res.status(404).send({
            message: `El album solicitado no existe`
        })
        res.status(200).send({album})
    })

}

function getAlbums(req, res) {
    Album.find({}, (err, albums) => {
        if (err) return res.status(500).send({
            message: `Error al realizar la petición: ${err}`
        })
        if (!albums) return res.status(404).send({
            message: `Los albums no existen`
        })
        res.status(200).send({ albums })
    })
}

function saveAlbum(req, res) {
    console.log('POST /api/album')
    console.log(req.body)

    let album = new Album()

    album.title = req.body.title
    album.description = req.body.description

    album.save((err, albumStored) => {
        if (err) res.status(500).send({
            message: `Error al guardar en la base de datos: ${err}`
        })

        res.status(200).send({ album: albumStored })
    })

}

function updateAlbum(req, res) {
    let albumId = req.params.albumId
    let update = req.body

    Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
        if (err) res.status(500).send({
            message: `Error al actualizar el album: ${err}`
        })

        res.status(200).send({
            album: albumUpdated
        })
    })

}

function deleteAlbum(req, res) {
    let albumId = req.params.albumId
    let update = req.body

    Album.findByIdAndRemove(albumId, (err, albumRemoved) => {
        if (err) res.status(500).send({
            message: `Error al borrar el album: ${err}`
        })
        if(!albumRemoved) res.status(404).send({
            message: `No se a podido eliminar el album`
        })
        res.status(200).send({
            album: albumRemoved
        })
    })

}

module.exports = {
    getAlbum,
    getAlbums,
    saveAlbum,
    updateAlbum,
    deleteAlbum
}
