const mensaje = require("../models/mensaje");

const obtenerChat = async (req, res) => {
  // Vemos el id que retorno despues de verificar el token
  const myId = req.id;

  // Vemos que usuario dispara el mensaje
  const mensajeDe = req.params.de;

  // Obtenemos los ultimos 30 mensajes
  const last30 = await mensaje
    .find({
      $or: [
        { de: myId, para: mensajeDe },
        { de: mensajeDe, para: myId },
      ],
    })
    .sort({ createdAt: "asc" })
    .limit(30);

  res.json({
    ok: true,
    message: last30,
  });
};

module.exports = {
  obtenerChat,
};
