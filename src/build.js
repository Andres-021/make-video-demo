const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'views'); // Directorio de entrada con archivos EJS
const outputDir = path.join(__dirname, 'public', 'html'); // Directorio de salida para archivos HTML

// Lee todos los archivos en el directorio de entrada
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error al leer el directorio de entrada:', err);
    return;
  }

  // Itera sobre cada archivo
  files.forEach(file => {
    // Comprueba si es un archivo EJS
    if (file.endsWith('.ejs')) {
      const inputFile = path.join(inputDir, file);
      const outputFile = path.join(outputDir, file.replace('.ejs', '.html'));

      // Lee el contenido del archivo EJS
      fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) {
          console.error('Error al leer el archivo EJS:', err);
          return;
        }

        // Compila el archivo EJS a HTML
        const html = ejs.render(data, { /* Variables si las hay */ });

        // Escribe el archivo HTML compilado en el directorio de salida
        fs.writeFile(outputFile, html, err => {
          if (err) {
            console.error('Error al escribir el archivo HTML:', err);
            return;
          }

          console.log(`Archivo HTML generado: ${outputFile}`);
        });
      });
    }
  });
});
