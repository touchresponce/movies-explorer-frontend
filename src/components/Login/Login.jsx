import "./Login.css";
import Input from "../Input/Input";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <section className="login">
      <div className="login__wrapper">
        <Link to="/" className="login__image" />
        <h1 className="login__text">Рады видеть!</h1>
        <form className="form login-form" name="login-form">
          <Input name="email" label="E-mail" type="email" />
          <Input name="password" label="Пароль" type="password" />
          <button
            className="login__submit"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              navigate("/movies");
            }}
          >
            Войти
          </button>
        </form>
        <p className="login__question">
          Ещё не зарегистрированы?
          <Link className="login__link" to="/signup">
            Регистрация
          </Link>
        </p>
      </div>
    </section>
  );
}
