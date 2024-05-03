const fs = require('fs');
const path = require('path');

const getImgs = (req, res) => {
  // Obtenemos la url donde se encuentran almacenadas las imágenes
  const imgs = path.join(__dirname, '..','..', 'public', 'imgs')
  // Leer el contenido del directorio
  fs.readdir(imgs, (err, files) => {
    if (err) {
      console.error('Error al leer el directorio:', err);
      return res.status(500).send('Error interno del servidor');
    }

    // Filtrar solo los files de imagen (puedes ajustar los tipos de file según tus necesidades)
    const imgsArr = files.map(file =>{
      // Extension de las imágenes aceptadas y que solo serán reenviadas
      if(file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')){
        return {url: `https://videoangelicaldemo.vercel.app/api/v1/static/img/${file}`}
      }
    });

    // Enviar la lista de imágenes al frontend
    return res.json({ imgs: imgsArr });
  });
}


module.exports = {
  getImgs
}