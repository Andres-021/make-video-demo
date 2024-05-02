function MessageVideo(number, url, nombre) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "video",
        "video": {
            "body": {
                "text": `de parte de ${nombre}`
            },            
            "link": url
        },
    });

    return data;
}

module.exports = {
    MessageVideo
}
