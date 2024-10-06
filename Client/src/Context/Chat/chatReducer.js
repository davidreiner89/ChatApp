import { types } from "../../types";

export const chatReducer = (state, action) => {
  switch (action.type) {
    // Cargar todos los usuarios
    case types.usuariosCargados:
      return { ...state, usuarios: action.payload };

    // Activar un chat con el id
    case types.chatActivo:
      // Si el id del usuario es el mismo retornamos el mismo stado
      if (state.chatActivo === action.payload) return state;

      // Si no lo actualizamos
      return { ...state, chatActivo: action.payload, mensajes: [] };

    // Cantidad de mensajes de un chat
    case types.mensajesChatActivo:
      if (
        state.chatActivo === action.payload.de ||
        state.chatActivo === action.payload.para
      ) {
        return {
          ...state,
          mensajes: [...state.mensajes, action.payload],
        };
      } else {
        return state;
      }

    // Cargar todos los mensajes de un chat
    case types.cargarMensajes:
      return {
        ...state,
        mensajes: action.payload,
      };

    // Devolver los valores a su estado inicial
    case types.resetValues:
      return {
        idUser: null,
        chatActivo: null,
        usuarios: [],
        mensajes: [],
      };

    default:
      return state;
  }
};
