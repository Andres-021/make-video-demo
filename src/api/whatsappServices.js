const https = require("https");
const { head } = require("../router/Routes");
const { stdout } = require("process");
const { error } = require("console");
const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
require('dotenv').config()

async function SendMessageWhatsApp(data) {

    try {
        const options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${process.env.TOKEN}`
            }
        };

        const req = await fetch('https://graph.facebook.com/v18.0/262891140247267/messages',options);
        const res = await req.json()
        
        return res;

    } catch (e) {
        // console.log(e);
    }

}

module.exports = {
    SendMessageWhatsApp
}