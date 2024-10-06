const { Router } = require("express");
const { validarJWT } = require("../Middleware/Validar-Token");
const { obtenerChat } = require("../Controller/mensajesController");

// Inicializamos el router de mensajes.
const router = Router();

router.get("/:de", validarJWT, obtenerChat);

module.exports = router;
