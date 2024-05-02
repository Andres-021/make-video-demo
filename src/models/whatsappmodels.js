function MessageVideo(number, url, nombre) {
    const data = {
        "messaging_product": "whatsapp",
        "to": number,
        "type": "video",
        "video": {
            "link": url,
            "caption": `De parte de ${nombre}`
        }
    };

    return data;
}

module.exports = {
    MessageVideo
}
