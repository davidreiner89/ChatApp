const {
  usuarioConectado,
  usuarioDesconectado,
  getUsuarios,
  guardarMensajes,
} = require("../Controller/socketsController");
const { comprobarJWT } = require("../Helper/jwt");

// 0) Creamos una clase de los sockets
class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    // 1) Se crea la conexion
    this.io.on("connection", async (socket) => {
      // 7) Evaluo el token enviado a traves del query
      const token = socket.handshake.query["token-storage"];

      // 8) Saber que usuario esta activo a traves del token
      const [response, id] = comprobarJWT(token);

      // console.log(response, id);

      // 9) Validar JWT, Si el token no es valido, desconectamos
      if (!response) {
        console.log("Token no valido");
        return socket.disconnect();
      }

      // 3) Usuario conectado (true)
      await usuarioConectado(id);

      // 1.a) Creamos una sala personal con el id del cliente conectado
      socket.join(id);

      // 10) Escuchar cuando el cliente manda un mensaje personal
      socket.on("mensaje-personal", async (message) => {
        // console.log(message);
        // 11) Guardar mensaje
        const mensaje = await guardarMensajes(message);
        // console.log(mensaje);

        // 12) Se lo emitimos a la persona
        this.io.to(message.para).emit("mensaje-personal", mensaje);
        this.io.to(message.de).emit("mensaje-personal", mensaje);
      });

      // 6) Emitir a los usuarios conectados
      this.io.emit("usuarios-conectados", await getUsuarios());

      // 2) Desconectar usuario
      socket.on("disconnect", async () => {
        // 4) Usuario desconectado (false)
        await usuarioDesconectado(id);
        // 5) Al momento de desconectarse es importante volver a poner esto, para que los usuarios conectados se actualizen
        this.io.emit("usuarios-conectados", await getUsuarios());
      });
    });
  }
}

module.exports = Sockets;
