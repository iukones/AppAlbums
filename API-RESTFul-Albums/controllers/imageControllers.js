'use strict'

const Image = require('../models/imageModels')
const Album = require('../models/albumModels')

// se carga path requerido para realizar función subir imagen a servidor.
const path = require('path')

// función para traer petición GET de una imagen por ID.
function getImage(req, res) {
  let imageId = req.params.imageId

  Image.findById(imageId, (err, image) => {
    if (err) return res.status(500).send({
      message: `Error al realizar la petición: ${err}`
    })
    if (!image) return res.status(404).send({
      message: `La imagen no existe`
    })
    // se crea metodo populate de mongoose para enlazar imagen con un album.
    Album.populate(image, {path: 'album'}, (err, image) => {
      if(err) return res.status(500).send({message: `Error al popular imagen con album: ${err}`})
      res.status(200).send({ image })
      })
  })
}

// función para traer todas las imagenes en petición GET.
function getImages(req, res) {
    let albumId = req.params.album

    if (!albumId) {
      // sacar todas las imagenes de la bbdd
      var find = Image.find({}).sort('title')
    }else {
      // sacar todas las imagenes asociadas al album
      var find = Image.find({ album: albumId }).sort('title')
    }
    // metodo para comprobar imagenes asociadas a un album.
    find.exec((err, images) => {
      if (err) {
        res.status(500).send({message: 'Error en la petición'});
      }else {
        if (!images) {
          res.status(404).send({message: 'No hay imagenes en este album!!'});
        }else {
          // metodo populate de mongoose para asociar las imagenes de un album.
          Album.populate(images, {path: 'album'}, (err, images) => {
            if(err) return res.status(500).send({message: `Error al popular imagen con album: ${err}`})
            res.status(200).send({ images })
            })
        }
      }
    });
}

// funcion para guardar una nueva imagen y asociarla a un album tipo POST.
function saveImage(req, res) {
  let image = new Image()

  image.title = req.body.title
  image.picture = null
  image.album = req.body.album

  image.save((err, imageStored) => {
    if(err) return res.status(500).send({
      message: `Error en la petición: ${err}`
    })
    res.status(200).send({ image: imageStored })
  })

}

// funcion actualizar una imagen tipo PUT.
function updateImage(req, res) {
    let imageId = req.params.imageId
    let update = req.body

    Image.findByIdAndUpdate(imageId, update, (err, imageUpdated) => {
        if (err) res.status(500).send({
            message: `Error al actualizar la imagen: ${err}`
        })

        res.status(200).send({
            image: imageUpdated
        })
    })

}

// funcion para eliminar una imagen por ID de tipo DELETE.
function deleteImage(req, res) {
    let imageId = req.params.imageId

    Image.findByIdAndRemove(imageId, (err, imageRemoved) => {
          if (err) res.status(500).send({
              message: `Error al borrar la imagen: ${err}`
          })
          if(!imageRemoved) res.status(404).send({
              message: `No se a podido eliminar la imagen`
          })
          res.status(200).send({
              image: imageRemoved
          })
      })
}

// funcion tipo POST para subir una imagen al servidor y poder mostrarla via URL.
function uploadImage(req, res) {
  let imageId = req.params.imageId
  let file_name = 'No subido...'

  if (req.files) {
    let file_path = req.files.image.path
    let file_split = file_path.split('\\')
    let file_name = file_split[1]

    Image.findByIdAndUpdate(imageId, { picture: file_name }, (err, imageUpdated) => {
        if (err) res.status(500).send({
            message: `Error al subir la imagen: ${err}`
        })
        if (!imageUpdated) res.status(404).send({
            message: 'No has subido ninguna imagen'
        })
        res.status(200).send({
            image: imageUpdated
        })
    })

  }
}

// función para devolver ruta de una imagen desde la URL

const fs = require('fs'); // esta es una variable pura de NodeJS

function getImageFile(req, res){
    let imageFile = req.params.imageFile;

    // validamos que exista la imagen en el repositorio
    fs.exists('./uploads/'+imageFile, function(exists) {
        if(exists){
            res.sendFile(path.resolve('./uploads/'+imageFile));
        }else {
            res.status(200).send({message: 'No existe la imagen solicitada'});
        }

    });
}



module.exports = {
  getImage,
  getImages,
  saveImage,
  updateImage,
  deleteImage,
  uploadImage,
  getImageFile
}
