function MessageVideo(number, url, de, para) {
    const data = {
        "messaging_product": "whatsapp",
        "to": number,
        "type": "video",
        "video": {
            "link": url,
            "caption": `De parte de ${de} para ${para}, te envía este pequeño mensaje angelical. Click en el link para enviar un mensaje a un ser querido. https://videoangelical.onrender.com/`
        }
    };

    return data;
}

module.exports = {
    MessageVideo
}
