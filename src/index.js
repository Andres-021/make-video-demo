const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');

const videoRouter = require('./router/videoRouter')
const imgRouter = require('./router/imgRouter')
//const express = require("express");
const apiRoute = require("./router/Routes");


const app = express();
const port = process.env.port || 4000;

app.use(express.json());

//ruta de la api para el controlador
app.use("/whatsapp", apiRoute);

// Codificando datos de entrada
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

// Directorio public nombrado como resources
app.use(express.static(path.join(__dirname, 'public')));

// Motor de plantilla 
app.set('view engine', 'ejs');

// Servir las imágenes estáticas
app.use('/api/v1/static/img', express.static(path.join(__dirname, '..', 'public', 'imgs')));
// Middleware para manejar archivos no encontrados
app.use('/api/v1/static/img', (req, res) => {
  res.status(404).json({message: 'Imagen no encontrada o extension incorrecta'});
});
// Servir las videos estáticas
app.use('/api/v1/static/video', express.static(path.join(__dirname, '..', 'public', 'upload')));
// Middleware para manejar archivos no encontrados
app.use('/api/v1/static/video', (req, res) => {
  res.status(404).json({message: 'Video no encontrado o extension incorrecta'});
});
app.use('/api/v1', videoRouter)
app.use('/api/v1', imgRouter)

app.listen(port, () => {
  console.log(`Server running in port${port}`)
})