import { HoraMes } from "../Helper/horaMes";

export const IncomingMessage = ({ txt, date }) => {
  return (
    <div className="incoming_msg">
      <div className="incoming_msg_img">
        <img
          src="https://ptetutorials.com/images/user-profile.png"
          alt="sunil"
        />
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          <p>{txt}</p>
          <span className="time_date">{HoraMes(date)}</span>
        </div>
      </div>
    </div>
  );
};
