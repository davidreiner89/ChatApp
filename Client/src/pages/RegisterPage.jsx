import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/Auth/AuthContext";
import { toast, Toaster } from "sonner";

export const RegisterPage = () => {
  // Provider
  const { Register } = useContext(AuthContext);

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  // Input Change
  const handleInputChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.nombre.length === 0 ||
      formData.email.length === 0 ||
      formData.password.length === 0
    ) {
      return toast.info("Debes completar todos los campos");
    }

    await Register(formData.nombre, formData.email, formData.password);

    setFormData({
      nombre: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-t-50 p-b-90">
            <Toaster />
            <form
              onSubmit={handleSubmit}
              className="login100-form validate-form flex-sb flex-w"
            >
              <span className="login100-form-title mb-3">Chat - Registro</span>

              <div className="wrap-input100 validate-input mb-3">
                <input
                  className="input100"
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                />
                <span className="focus-input100"></span>
              </div>

              <div className="wrap-input100 validate-input mb-3">
                <input
                  className="input100"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <span className="focus-input100"></span>
              </div>

              <div className="wrap-input100 validate-input mb-3">
                <input
                  className="input100"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <span className="focus-input100"></span>
              </div>

              <div className="row mb-3">
                <div className="col text-right">
                  <Link to="/login" className="txt1">
                    Ya tienes cuenta?
                  </Link>
                </div>
              </div>

              <div className="container-login100-form-btn m-t-17">
                <button className="login100-form-btn">Crear cuenta</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
