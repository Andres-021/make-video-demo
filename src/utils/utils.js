const {exec} = require('child_process')
const fs = require('fs');
const path = require('path');

const {whitelist } = require('validator');

// Función para ejecutar un comando de FFmpeg
function ejecutarFFmpeg(comand, path) {
  return new Promise((resolve, reject) => {
    exec(comand, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        console.log(error)
        return;
      }
      resolve(path);
    });
  });
}

function eliminarArchivo (path){

  if(Array.isArray(path)){
    // Eliminar los videos individuales
    for (let i = 0; i < path.length; i++) {
      fs.unlinkSync(path[i]);
    }
    
  }else{
    fs.unlinkSync(path);
  }
}


function dividirTexto(texto, longitudMaxima) {
  let palabras = texto.split(' ');
  let lineas = [];
  let lineaActual = palabras.shift();

  for (let palabra of palabras) {
    if (lineaActual.length + palabra.length + 1 <= longitudMaxima) {
      lineaActual += ' ' + palabra;
    } else {
      lineas.push(lineaActual);
      lineaActual = palabra;
    }
  }

  lineas.push(lineaActual);
  return lineas;
}

function calcularTiempoLectura(texto, palabrasPorMinuto) {
  const palabras = texto.split(' ').length;
  const tiempoLecturaMinutos = palabras / palabrasPorMinuto;
  const tiempoLecturaSegundos = tiempoLecturaMinutos * 60;
  return tiempoLecturaSegundos.toFixed(0); // Redondear a entero
}

async function verificarExistenciaImagen(ruta) {
  try {
    const extension = path.extname(ruta).toLowerCase();

    if (extension !== '.jpg' && extension !== '.jpeg' && extension !== '.png') {
      return false;
    }    

    const resp = await new Promise((resolve, reject) => {

      fs.access(ruta, fs.constants.F_OK, (err) => {
        if(err){
          reject(err)
        }

        resolve(true)
      });
    })

    return resp; // El archivo existe

  } catch (error) {
    return false; // El archivo no existe

  }
}

/**
 * Sanitiza los parámetros de búsqueda utilizando un whitelist de caracteres permitidos.
 * @param {Object} params - Los parámetros de búsqueda.
 * @returns {Object} - Un objeto con los parámetros de búsqueda sanitizados.
 */
function sanitizeParams(params) {
  // console.log(params)
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789. '

  const sanitizedParams = Object.entries(params).reduce((acc, [key, value]) => {
    acc[key] = whitelist(value.toString(), characters);
    return acc;
  }, {});
  // console.log(sanitizedParams)

  return sanitizedParams;
}

module.exports = {
  ejecutarFFmpeg,
  dividirTexto,
  calcularTiempoLectura,
  verificarExistenciaImagen,
  sanitizeParams,
  eliminarArchivo
}