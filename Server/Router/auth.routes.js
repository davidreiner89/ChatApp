// Modulos a usar
const { Router } = require("express");
const { check } = require("express-validator");

// Controladoras de rutas
const {
  CreateUser,
  LoginUser,
  RefreshToken,
} = require("../Controller/authController");

// Middleware para validar los campos del formulario
const { validateSchema } = require("../Middleware/Validar-Campos");
const { validarJWT } = require("../Middleware/Validar-Token");

// Inicializamos el router de autenticacion.
const router = Router();

// Crear nuevos usuarios
router.post(
  "/new",
  [
    check("nombre", "El nombre de usuario es obligatorio").not().isEmpty(),
    check("email", "El  correo electrónico es obligatorio").isEmail(),
    check("password", "La contraseña es obligatorio").not().isEmpty(),
    validateSchema,
  ],
  CreateUser
);

// Login
router.post(
  "/",
  [
    check("email", "El  correo electrónico es obligatorio").isEmail(),
    check("password", "La contraseña es obligatorio").not().isEmpty(),
    validateSchema,
  ],
  LoginUser
);

// Renovar token
router.get("/renew", validarJWT, RefreshToken);

module.exports = router;
