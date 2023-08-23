import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { EventOnChange, EventPreventDefault } from "../../models/event";
import { LoginResponse } from "../../models/response";
import { createSession } from "../../services/token-repository";
import { PATHNAMES } from "../../routes/routes";
import { useLogin } from "../../utils/hooks/use-login";

import burgerImg from "../../assets/burger.jpg";
import "./login-form.css";


const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { loginRequest, loginRequestStatus } = useLogin();
  const loginLoading = loginRequestStatus === "loading";
  const initialFormState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const [message, setMessage] = useState("");

  const handleChangeEmail = (e: EventOnChange) =>
    setFormData({ ...formData, email: e.target.value });

  const handleChangePassword = (e: EventOnChange) =>
    setFormData({ ...formData, password: e.target.value });

  const handleSession = (res: LoginResponse) => {
    createSession(res.accessToken, res.user);
    navigate(PATHNAMES.HOME);
  };

  const handleSubmit = (e: EventPreventDefault) => {
    e.preventDefault();
    setMessage("");
    loginRequest({
      payload: {
        email: formData.email,
        password: formData.password,
      },
      options: {
        onSuccess: handleSession,
        onError: (error) => setMessage(error.message),
      },
    });
  };

  return (
    <>
      <section className="login-site">
        <img src={burgerImg} alt="burger" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="user-email">E-mail:</label>
          <input
            required
            type="email"
            placeholder="email"
            disabled={loginLoading}
            value={formData.email}
            onChange={handleChangeEmail}
          />
          <br />
          <label htmlFor="user-password">Password:</label>
          <input
            required
            type="password"
            placeholder="password"
            disabled={loginLoading}
            value={formData.password}
            onChange={handleChangePassword}
          />
          <br />
          {loginLoading && (
            <>
              <span>Loading...</span>
              <br />
            </>
          )}
          {message && (
            <>
              <span>{message}</span>
              <br />
            </>
          )}
          <button type="submit" disabled={loginLoading}>
            Login
          </button>
        </form>
      </section>
    </>
  );
};
export default LoginForm;
