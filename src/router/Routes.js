const expres = require("express");
const router = expres.Router();
const whatsappController = require("../controller/whatsappControlles");

router
.get("/", whatsappController.VerifyToken)
.post("/", whatsappController.ReceivedMenssage)

module.exports = router;