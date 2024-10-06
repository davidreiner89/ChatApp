// Importamos mongoose
const mongoose = require("mongoose");

// Creamos una funcion para realizar la conexión a la base de datos
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.log("Error al intentar conectarnos con la BD: ", error);
  }
};

module.exports = connectDB;
