// Servidor de Express
// Modulos a usar
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const CORS = require("cors");

// Archivos y carpetas del proyecto
const Sockets = require("./sockets");
const connectDB = require("../Database/config");
const usuarios = require("../Router/auth.routes");
const mensajes = require("../Router/mensaje.routes");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Conectar a BD de MongoDB
    connectDB();

    // Http server
    this.server = http.createServer(this.app);

    // Configuraciones de sockets
    this.io = socketio(this.server, {
      /* configuraciones */
    });
  }

  middlewares() {
    // Habilitamos CORS
    this.app.use(CORS());

    //  Parsea el body en formato JSON
    this.app.use(express.json());

    // EndPoints de nuestra API
    this.app.use("/api/login", usuarios);
    this.app.use("/api/mensajes", mensajes);
  }

  // Esta configuración se puede tener aquí o como propieda de clase
  // depende mucho de lo que necesites
  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    // Inicializar Middlewares
    this.middlewares();

    // Inicializar sockets
    this.configurarSockets();

    // Inicializar Server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto:", this.port);
    });
  }
}

module.exports = Server;
