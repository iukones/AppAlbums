'use strict'

const express = require('express')
const ImageCtrl = require('../controllers/imageControllers')
const api = express.Router()
// utilizamos multiparty para crear el multipartMiddleware.
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart({ uploadDir: './uploads' })


// peticion tipo GET especifica al elemento imageId
api.get('/image/:imageId', ImageCtrl.getImage)

// peticion tipo GET a image
api.get('/images/:album?', ImageCtrl.getImages)

// peticion tipo POST a image
api.post('/image', ImageCtrl.saveImage)

// peticion tipo PUT para actualizar imageId
api.put('/image/:imageId', ImageCtrl.updateImage)

// peticion tipo DELETE a product en base de datos.
api.delete('/image/:imageId', ImageCtrl.deleteImage)

// peticion tipo POST para subir imagenes.
api.post('/upload-image/:imageId', multipartMiddleware, ImageCtrl.uploadImage)

// peticion tipo GET para devolver ruta URL de imagenes.
api.get('/get-image/:imageFile', multipartMiddleware, ImageCtrl.getImageFile)




module.exports = api
