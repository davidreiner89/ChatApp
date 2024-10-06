import { useContext } from "react";
import { AuthContext } from "../Context/Auth/AuthContext";

export const Searchbox = () => {
  const { LogOut, auth } = useContext(AuthContext);

  return (
    <div className="headind_srch">
      <div className="recent_heading mt-2">
        <h4>{auth.name}</h4>
      </div>
      <div className="srch_bar">
        <div className="stylish-input-group">
          <button onClick={LogOut} className="btn text-danger text-red-600">
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};
