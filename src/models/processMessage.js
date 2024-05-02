//condicionamos mensajes recibidos desde whatsapp
const whatsappModel = require ("../shared/whatsappmodels");
const whatsappService = require("../services/whatsappServices");
const chatgptService = require("../services/chatgpt-services");
const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));

async function Process(textUser, number){
    textUser = textUser.toLowerCase();
    let models = [];
    //#region sin chatGPT
    //hola que tal
    /*if(textUser.includes("hola")){
        //saludar
        let model = whatsappModel.MenssageText("hola un gusto saludarte", number);
        models.push(model);
        let modelbutton = whatsappModel.MenssageButtons(number);
        models.push(modelbutton);
    }

    else if(textUser.includes("gracias")){
        //agradecimiento
        let model = whatsappModel.MenssageText("gracias a ti por escribirme", number);
        models.push(model);
    }

    else if(textUser.includes("adios") ||
    textUser.includes("adíos") ||
    textUser.includes("bye") ||
    textUser.includes("me voy")){
        //despedir
        let model = whatsappModel.MenssageText("ve con cuidado", number);
        models.push(model);
    }

    else if(textUser.includes("agencia")){
        //agradecimiento
        let model = whatsappModel.MensaageLocation(number);
        models.push(model);
    }

    else if(textUser.includes("contacto")){
        //agradecimiento
        let model = whatsappModel.MenssageText("*Centro de contacto:*\n123456789", number);
        models.push(model);
    }
    /*else if(textUser.includes("si")){
        //si
        let model = whatsappModel.MenssageText(number);
        models.push(model);
    }
    else if(textUser.includes("no")){
        //no
        let model = whatsappModel.MenssageNo("registrate en el sigueinte fromulario para registrarte: https://www.amazon.com/", number);
        models.push(model);
    }
    else {
        //No entiendo
        let model = whatsappModel.MenssageText("no entiendo lo que dices", number);
        models.push(model);
    }*/
    //#endregion
    //#region con chatGPT
    const resultChatGPT = await chatgptService.GetMessageChatGPT(textUser);

    if(resultChatGPT != null){
        let model = whatsappModel.MenssageText(resultChatGPT, number);
        models.push(model);
    }
    else{
        let model = whatsappModel.MenssageText("lo siento algo salio mal, intentalo mas tarde.", number);
        models.push(model);
    }
    //#endregion

    models.forEach(model => {
        whatsappService.SendMessageWhatsApp(model)
    });    
}

module.exports = {
    Process
};