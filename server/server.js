
const express = require('express')
const app = express()
//Puerto de la API
const port = 3000
const mongoose = require('mongoose');   //Cliente de conexion a mongoDB
const bodyParser = require('body-parser');  //Parsea a JSON
require('dotenv/config');   //Permite poner los string de conexion y claves como variables de entorno en .env

//Importo las rutas
const authRoute = require('./routes/auth');
const notesRoute = require('./routes/notes');

//Middleware
app.use(bodyParser.json());   //Usa bodyparser para todas las rutas

//Routes
app.use('/v1/auth', authRoute);
app.use('/v1/notes', notesRoute);


//Conectar a la DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Concetado a la DB!!')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

