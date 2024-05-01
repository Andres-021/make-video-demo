const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config()

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMINI);

async function gemini(message) {
  try{
    
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{text: "Convierte los mensajes que recibas en un mensaje angelical que tenga 2 párrafos de 30 palabras cada párrafo, evita añadir títulos y responder al mensaje, solo conviértelo a angelical"}]
        },
        {
          role: "model",
          parts: [{ text: "En que puedo ayudarte?" }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      }
    })

    // const prompt = `Convierte el siguiente texto en un mensaje angelical corto, mensaje: ${message}, recuerda máximo 2 párrafos pequeños de 20 palabras cada uno`
    const result = await chat.sendMessage(message)
    const response = await result.response;
    const text = response.text().split('\n');

    const messageArr = text.filter(str => str !== '' && str !== '\'')
    messageArr.push('¿Quieres convertirte en un angel para alguien especial?') // Finalización del video
    messageArr.push('Explora el sendero de la conexión. Haz click en el enlace debajo de este video para enviar un mensaje especial a un ser querido')
    // console.log(messageArr)
    return messageArr
    
  }catch(e){
    console.log(e)
  }

}

module.exports = {
  gemini
}