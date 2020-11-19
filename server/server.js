
const express = require('express')
const app = express()
//Puerto de la API
const port = 3000
const mongoose = require('mongoose');   //Cliente de conexion a mongoDB
const bodyParser = require('body-parser');  //Parsea a JSON
require('dotenv/config');   //Permite poner los string de conexion y claves en el .env

//Importo las rutas
const usersRoute = require('./routes/users');
const notesRoute = require('./routes/notes');

//Middleware
app.use(bodyParser.json());   //Usa bodyparser para todas las rutas
app.use('/users', usersRoute);
app.use('/notes', notesRoute);

//ROUTES
/* app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/', function (req, res) {
    res.send('Got a POST request');
});

app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user');
});

app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user');
}); */

//Conectar a la DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Concetado a la DB')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
