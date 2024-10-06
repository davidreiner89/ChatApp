import { HoraMes } from "../Helper/horaMes";

export const OutgoingMessage = ({ txt, date }) => {
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{txt}</p>
        <span className="time_date">{HoraMes(date)}</span>
      </div>
    </div>
  );
};
