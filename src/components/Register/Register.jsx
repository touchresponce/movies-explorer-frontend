import "./Register.css";
import Input from "../Input/Input";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  return (
    <section className="register">
      <div className="register__wrapper">
        <Link to="/" className="register__image" />
        <h1 className="register__text">Добро пожаловать!</h1>
        <form className="form register-form" name="register-form">
          <Input name="name" label="Имя" type="text" />
          <Input name="email" label="E-mail" type="email" />
          <Input name="password" label="Пароль" type="password" />
          <button
            className="register__submit"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              navigate("/signin"); // временно
            }}
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="register__question">
          Уже зарегистрированы?
          <Link to="/signin" className="register__link">
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
}
