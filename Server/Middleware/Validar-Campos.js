const { validationResult } = require("express-validator");

const validateSchema = (req, res, next) => {
  // Almacenamos los errores de validacion en una variable para retornarlos
  const errores = validationResult(req);

  // Si hay errores, creamos un objeto para enviarlo al cliente.
  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errores.mapped(),
    });
  }

  // Si no hay errores, llamamos a la función next() para pasar al siguiente middleware
  next();
};

module.exports = { validateSchema };
