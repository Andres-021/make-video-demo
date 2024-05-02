const https = require("https");
const { head } = require("../router/Routes");
const { stdout } = require("process");
const { error } = require("console");
const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));

async function SendMessageWhatsApp(data) {

    try {
        const options = {
            host: "graph.facebook.com",
            path: "/v18.0/262891140247267/messages",
            method: "POST",
            body: data,
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer EAAFZCtPRcfr4BO1DlMhtFkjbTgtlEcRpReymgXpQ9FmjxAGvzT1yac0nI0fz2ayBUXQRg1bhlsZAINW2jVGiIreXNFeQQ02MXuuYSzLwZC1IZCW5V4dZC514ZAWywZB4tMVzeteQnYr5YiiZCEIbjXXw44m9RlqDgtefCXsgrkFkgad8F6UXeoZBuYz8M66yF0YE9"
            }
        };

        const req = await fetch(options);
        console.log(req);
        return req;

    } catch (e) {
        myConsole.log(e);
    }
    // const req = https.request(options, res => {
    //     res.on("data", d=>{
    //         process.stdout.write(d);
    //     });
    // });

}

module.exports = {
    SendMessageWhatsApp
}