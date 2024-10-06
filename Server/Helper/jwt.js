const jwt = require("jsonwebtoken");

// Funcion para generar el token de acceso con el ID del usuario autenticado.
const generarJWT = (_id) => {
  return new Promise((resolve, reject) => {
    // Se crea un payload con la informacion del usuario autenticado
    const payload = { _id };

    jwt.sign(
      payload,
      process.env.JWT_KEY,
      { expiresIn: "15m" },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};

// Funcion para combrobar que usuario genero el JWT
const comprobarJWT = (token = "") => {
  try {
    const { _id } = jwt.verify(token, process.env.JWT_KEY);
    return [true, _id];
  } catch (error) {
    console.log(error);
    return [false, null];
  }
};

module.exports = {
  generarJWT,
  comprobarJWT,
};
