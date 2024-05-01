const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/api/enviar-datos", (req, res) => {
    const imagen = req.body.imagen;
    const mensaje = req.body.mensaje;

    console.log("Datos recibidos del Frontend:");
    console.log("Imagen:", imagen);
    console.log("mensaje:", mensaje);

    res.json({ message: "Datos recibidos correctamente en el servidor" });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando el puerto ${PORT}`);
});
