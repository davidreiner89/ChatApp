import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Context/Auth/AuthContext";
import { toast, Toaster } from "sonner";

export const LoginPage = () => {
  // Utilizo mi contexto
  const { Login } = useContext(AuthContext);

  // Estado de mi formulario
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // UseEffect para establecer los valores en el storage
  useEffect(() => {
    // Vemos si hay un email guardado
    const emailRemember = localStorage.getItem("email");

    // Si lo hay entonces lo establecemos
    if (emailRemember) {
      setFormData((formData) => ({
        ...formData,
        email: emailRemember,
        rememberMe: true,
      }));
    }
  }, []);

  // Funcion para capturar los datos
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Funcion para el toggle
  const handleRememberMe = () => {
    setFormData({ ...formData, rememberMe: !formData.rememberMe });
  };

  // Funcion para subir el formulario
  const loginUser = async (e) => {
    e.preventDefault();

    if (formData.email.length === 0 || formData.password.length === 0) {
      return toast.info("Debes completar todos los campos");
    }

    // Si el recordarme esta en true guardamos en el storage
    formData.rememberMe
      ? localStorage.setItem("email", formData.email)
      : localStorage.removeItem("email");

    // Ejecutamos la funcion
    await Login(formData.email, formData.password);

    // Limpiamos los campos
    setFormData({ email: "", password: "", rememberMe: false });
  };

  return (
    <>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-t-50 p-b-90">
            <Toaster />
            <form
              className="login100-form validate-form flex-sb flex-w"
              onSubmit={loginUser}
            >
              <span className="login100-form-title mb-3">Chat - Ingreso</span>

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
                <div className="col" onClick={handleRememberMe}>
                  <input
                    className="input-checkbox100"
                    id="ckb1"
                    type="checkbox"
                    name="remember-me"
                    checked={formData.rememberMe}
                    readOnly
                  />
                  <label className="label-checkbox100">Recordarme</label>
                </div>

                <div className="col text-right">
                  <Link to="/register" className="txt1">
                    Nueva cuenta?
                  </Link>
                </div>
              </div>

              <div className="container-login100-form-btn m-t-17">
                <button className="login100-form-btn">Ingresar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
