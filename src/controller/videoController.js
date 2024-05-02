const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const whatsappModels = require("../models/whatsappmodels");
const whatsappService = require("../api/whatsappServices");


const {gemini} = require('../api/gemini')

const { ejecutarFFmpeg, dividirTexto, calcularTiempoLectura, sanitizeParams, verificarExistenciaImagen, eliminarArchivo } = require('../utils/utils');
const { off } = require('process');

const generateVideo = async (req, res) => {
  try{
    const body = req.body;
    const { imagen, numero, mensaje } = sanitizeParams(body)

    if(!imagen){
      return res.status(400).json({message: 'Debe seleccionar una imagen'})
      
    }

    if(!numero){
      return res.status(400).json({message: 'Debe enviar un numero'})

    }

    if(!mensaje){
      return res.status(400).json({message: 'Debe enviar un mensaje'})
      
    }
  
    const img = path.join(__dirname, '..', '..', 'public', 'imgs', imagen)
    const imgValid = await verificarExistenciaImagen(img)

    if(!imgValid){
      return res.status(400).json({message: 'Nombre de imagen invalida'})
    } 


    const message = await gemini(mensaje)
    if(!message || typeof message === 'undefined' || message.length <=2){
      return res.status(500 ).json({message: 'Error al generar el mensaje angelical'})

    }

    const arr = await Promise.all(message.map(async(el) => {
      const lines = dividirTexto(el, 30)
      const newDuration = calcularTiempoLectura(lines.join(' '), 200)

      let pixels = 260
      let increment = 10
      let linesArr

      const outputFileName = uuidv4() + '.asf'; // Nombre de archivo de salida con extensión ".mp4"
      filePath = path.join(__dirname, '..','..', 'public', 'upload', outputFileName);

      if(Array.isArray(lines)){
        linesArr = lines.map((text) => {
          const pixel = pixels + increment
          increment = increment + 55
          
          return `drawtext="fontfile=${path.join(__dirname, '..','..','public','fonts','roboto','Roboto-Bold.ttf')}:text='${text}':x=(w-tw)/2:y=${pixel}:fontcolor=black:fontsize=36:box=1:boxcolor=white@0.5:boxborderw=5"`
        })
      }

      const ffmpegCommand = [
        'ffmpeg',
        '-loop', '1',
        '-i', `${img}`, // Imagen del video
        '-t', `${newDuration}`, // Duración
        '-vf', `${linesArr.join(',')}`,
        '-c:v', 'wmv2', // Cambiar a códec H.265
        '-c:a', 'aac', // Formato de audio
        '-b:v', '5M', // Tasa de bits de video de 5 Mbps
        '-s', '1080x1920', // Resolución Full HD
        '-aspect', '9:16', // Relación de aspecto 9:16
        '-r', '30', // Fps
        '-f', 'asf', // Especificar formato ASF
        filePath
      ];
      

      // Unir los elementos del comando con espacios
      const ffmpegCommandString = ffmpegCommand.join(' ');

      // Generar cada segmento de video con el texto dividido en líneas
      return await ejecutarFFmpeg(ffmpegCommandString, filePath);
    }));

    // console.log(arr)
    // Verificamos si la cantidad de archivos creados es igual a la cantidad de mensajes
    if(arr.length < message.length){
      eliminarArchivo(arr) // Elimina el video que contiene cada ruta en el arr

      return res.status(500).json({message: 'Error al producir el video'}) // Comunicamos el mensaje
    }
    // Concatenar los segmentos para formar el video completo
    const concatList = arr.map(segmentFile => `file '${segmentFile}'`).join('\n');
    const concatFilePath = path.join(__dirname, '..', '..', 'public', 'upload', 'concat.txt');
    fs.writeFileSync(concatFilePath, concatList);

    // mp4
    const outputFileName = uuidv4() + '.mp4';
    filePath = path.join(__dirname, '..','..', 'public', 'upload', outputFileName);
    await ejecutarFFmpeg(`ffmpeg -f concat -safe 0 -i ${concatFilePath} -i ${path.join(__dirname, '..', '..', 'public', 'audio', 'audio1.mp3')} -c:v libx264 -c:a aac -strict experimental ${filePath}`, filePath);

    eliminarArchivo(concatFilePath) // Elimina el archivo de concatenación
    eliminarArchivo(arr) // Elimina el video que contiene cada ruta en el arr
    
    // res.sendFile(filePath); // Enviar el video final al cliente
    const parts = filePath.split("\\");
    const nameFile = parts[parts.length - 1];

    const models = whatsappModels.MessageVideo(numero,`https://ssdc2b55-4000.use2.devtunnels.ms/api/v1/static/video/${nameFile}`, "juan")
    const modelService = await whatsappService.SendMessageWhatsApp(models);

    
    if(modelService.hasOwnProperty('error')){
      return res.status(500).json({
        message: modelService.error.message
      })
    }

    // console.log(modelService)

    return res.status(202).json({
      message: 'Video enviado',
      url: `https://ssdc2b55-4000.use2.devtunnels.ms/api/v1/static/video/${nameFile}`
    })
    
  }catch(e){
    console.log(e)
  }
  
}

module.exports = {
  generateVideo
}