const bcrypt = require("bcrypt");

// Modelo de usuario
const Usuario = require("../models/usuario");
const { generarJWT } = require("../Helper/jwt");

// Crear un Usuario
const CreateUser = async (req, res) => {
  // Extraemos el email y la contraseña del body
  var { email, password } = req.body;

  try {
    // Verificamos el correo no este en uso
    const emailInUse = await Usuario.findOne({ email });

    if (emailInUse)
      return res.status(400).json({
        message: "El correo electrónico ya está registrado",
        ok: false,
      });

    // Le pasamos los datos a nuestro modelo
    const newUser = new Usuario(req.body);

    // Encriptamos la contraseña
    const salt = await bcrypt.genSalt();
    newUser.password = await bcrypt.hash(password, salt);

    // Guardamos el nuevo usuario en la base de datos
    const userSave = await newUser.save();

    // Generamos el JWT
    const token = await generarJWT(userSave._id);

    // Devolvemos los datos
    res.json({
      ok: true,
      id: userSave._id,
      nombre: userSave.nombre,
      email: userSave.email,
      online: userSave.online,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hacer login
const LoginUser = async (req, res) => {
  // Extraemos el email y la contraseña del body
  var { email, password } = req.body;

  try {
    // Buscamos si el usuario existe en la BD
    const usuarioLogeado = await Usuario.findOne({ email });

    if (!usuarioLogeado)
      return res.status(400).json({
        message: "El usuario no existe",
        ok: false,
      });

    // Comprobamos la contraseña
    const validarContrasena = await bcrypt.compare(
      password,
      usuarioLogeado.password
    );
    if (!validarContrasena)
      return res.status(400).json({
        message: "Correo o contraseña incorrectos",
        ok: false,
      });

    // Creamos un token con el ID del usuario logueado
    const token = await generarJWT(usuarioLogeado._id);

    // Lo almacenamos en una cookie
    // res.cookie("token", token);

    // Devolvemos los datos
    res.json({
      ok: true,
      id: usuarioLogeado._id,
      nombre: usuarioLogeado.nombre,
      email: usuarioLogeado.email,
      online: usuarioLogeado.online,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Renovar token de acceso
const RefreshToken = async (req, res) => {
  // Recogemos el id de la request
  const id = req.id;

  // Generamos un nuevo token con el id del usuario
  const token = await generarJWT(id);

  // Obtenemos el usuario por el id
  const userDB = await Usuario.findById(id);

  res.json({
    ok: true,
    ok: true,
    token,
    id: userDB._id,
    nombre: userDB.nombre,
    email: userDB.email,
    online: userDB.online,
  });
};

module.exports = {
  CreateUser,
  LoginUser,
  RefreshToken,
};
