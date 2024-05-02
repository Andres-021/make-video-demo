const https = require("https");
const { head } = require("../router/Routes");
const { stdout } = require("process");
const { error } = require("console");
const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));

async function SendMessageWhatsApp(data) {

    try {
        const options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer EAAFthF7xDrgBO4cHJ4Sv1SMaWqStQxBS8nKMCv2L2T8nF0UCZAQZBklSKtahzzz3ZAIpvo2ESGxsudTb1xQP0ALKfYbMl4nlmrGBcvEq4NU6komgzNUqZCRvu4ZA8BmCoKHMI2evNjXqTtDWt6YCZCWHuILEDU1n6iVjslDsCXBOgE43b87gZCyRDNcd5gNi9qp"
            }
        };

        const req = await fetch('https://graph.facebook.com/v18.0/262891140247267/messages',options);
        const res = await req.json()
        
        return res;

    } catch (e) {
        console.log(e);
    }

}

module.exports = {
    SendMessageWhatsApp
}