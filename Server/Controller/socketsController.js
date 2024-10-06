const Usuario = require("../models/usuario");
const Mensaje = require("../models/mensaje");

// Cambiar el estado del usuario a conectado
const usuarioConectado = async (id) => {
  const usuario = await Usuario.findById(id);
  usuario.online = true;
  await usuario.save();
  return usuario;
};

// Cambiar el estado del usuario a desconectado
const usuarioDesconectado = async (id) => {
  const usuario = await Usuario.findById(id);
  usuario.online = false;
  await usuario.save();
  return usuario;
};

// Obtener todos los usuarios conectados
const getUsuarios = () => {
  const usuarios = Usuario.find().sort("-online");
  return usuarios;
};

// Guardar los mensajes en la BD
const guardarMensajes = async (message) => {
  // Verificamos que tengan los campos necesarios (de,para,mensaje)
  if (!message.de || !message.para || !message.mensaje) {
    return false;
  }

  try {
    const mensaje = new Mensaje(message);

    // Guardamos
    await mensaje.save();

    return mensaje;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Obtener mensajes
const getMessages = () => {};

module.exports = {
  usuarioConectado,
  usuarioDesconectado,
  getUsuarios,
  guardarMensajes,
};
