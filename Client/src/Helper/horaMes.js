import moment from "moment";

export const HoraMes = (fecha) => {
  // usamos moment para obtener el formato de la fecha
  const fechaMoment = moment(fecha);

  // Convertimos la fecha a hora-minuto am/pm mes-dia
  return fechaMoment.format("HH:mm a | MMM Do");
};
