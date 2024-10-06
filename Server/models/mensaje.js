const { model, Schema } = require("mongoose");

// Creamos la schema del modelo de Usuario
const MensajeSchema = Schema(
  {
    de: {
      // Referencia al Modelo Usuario para crear una relación entre usuarios y mensajes
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    // Referencia al Modelo Usuario para crear una relación entre usuarios y mensajes
    para: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    mensaje: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Agregamos campos automáticos createdAt y updatedAt
);

module.exports = model("Mensaje", MensajeSchema);
