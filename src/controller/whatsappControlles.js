//verificacion de token
//meto par recibir los mensajes que llegan a partir de whatsapp
const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const processMessage = require("../utils/processMessage");
//const whatsappService = require("../services/whatsappServices");
//const samples = require("../shared/sampleModels");

const VerifyToken = (req, res) => {

    try{
        let accessToken = "DFASFSDFSDGDFHRTYWRQRADGHDF65GR43QDF2ER342F";
        let token = req.query["hub.verify_token"];
        let challenge = req.query["hub.challenge"];

        if(challenge != null && token != null && token == accessToken){
            res.send(challenge);
        }else{
            res.status(400).send();
        }

    }catch(e){
        res.status(400).send();
    }
    //console.info("hola verifyToken");
    //res.send("hola verifyToken");
}

async function ReceivedMenssage (req, res){

    try {
        //myConsole.log("inicio");
        let entry = (req.body["entry"])[0];
        let changes = (entry["changes"])[0]; 
        let value = changes["value"];       
        let messageObject = value["messages"];       

        if(typeof messageObject != "undefined"){
            let messages = messageObject[0];
            let number = messages["from"];

            let text = GetTexUser(messages);            
            //#region ejemplos
            /*if(text == "text"){
                let data = samples.SampleText("hola usuario", number);
                whatsappService.SendMessageWhatsApp(data);
            }
            else if(text == "image"){
                let data = samples.SampleImage(number);
                whatsappService.SendMessageWhatsApp(data);
            }
            else if(text == "audio"){
                let data = samples.SampleAudio(number);
                whatsappService.SendMessageWhatsApp(data);
            }
            else if(text == "video"){
                let data = samples.SampleVideo(number);
                whatsappService.SendMessageWhatsApp(data);
            }
            else if(text == "documento"){
                let data = samples.SampleDocument(number);
                whatsappService.SendMessageWhatsApp(data);
            }
            else if(text == "documento"){
                let data = samples.SampleDocument(number);
                whatsappService.SendMessageWhatsApp(data);
            }
            else if(text == "button"){
                let data = samples.SampleButtons(number);
                whatsappService.SendMessageWhatsApp(data);
            }
            else if(text == "location"){
                let data = samples.SampleLocation(number);
                whatsappService.SendMessageWhatsApp(data);
            }
            else{
                let data = samples.SampleText("no endiendo", number);
                whatsappService.SendMessageWhatsApp(data);
            }*/
            //#endregion
            
            if(text != ""){
                //myConsole.log(text);
                //myConsole.log(number);
                await processMessage.Process(text, number);
                myConsole.log("1")
            }
        }        
        res.send("EVENT_RECEIVED");        
    } catch (e) {
        myConsole.log(e);
        res.send("EVENT_RECEIVED");       
        
    }
    //console.info("hola Received");
    //res.send("hola Received");
}

function GetTexUser(messages){
    let text = "";
    let typeMessage = messages["type"];
    if(typeMessage == "text"){
        text = (messages["text"])["body"];

    }
    else if(typeMessage == "interactive"){

        let interactiveObject = messages["interactive"];
        let typeInteractive = interactiveObject["type"];
        //myConsole.log(interactiveObject);
        if(typeInteractive == "button_reply"){
            text = (interactiveObject["button_reply"])["title"];
        }
        else if (typeInteractive == "list_reply"){
            text = (interactiveObject["list_reply"])["title"];
        }else{
            myConsole.log("sin mensaje")
        }

    }else{
        myConsole.log("sin mensaje")
    }
    return text;
}

module.exports = {
    VerifyToken,
    ReceivedMenssage
};