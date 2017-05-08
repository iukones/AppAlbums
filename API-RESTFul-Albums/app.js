'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// se carga rutas
const api = require('./routers/albumRouters')
const api_images = require('./routers/imageRouters')

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

// configuramos cabeceras HTTP CORS etc, para acceder desde nuetra aplicación a nuestra API.
app.use((req, res, next) => {
  // aqui configuramos que cualquiera puede acceder a nuestra API.
  res.header('Access-Control-Allow-Origin', '*')
  // configuramos los Headers que puede mandar o llegar a nuestra API.
  res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
  // configuramos metodos HTTP que se pueden utilizar en nuestra API.
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  // Por ultimo indicamos cabeceras Allow.
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')

  // declaramos la funcion NEXT para salir .
  next()

})


// rutas base
app.use('/api', api)
app.use('/api', api_images)

// exportar el modulo
module.exports = app
