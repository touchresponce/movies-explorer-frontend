import "./Login.css";
import { useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import AuthPage from "../AuthPage/AuthPage";

export default function Login() {
  const navigate = useNavigate();

  function navigateToMovies(e) {
    e.preventDefault();
    navigate("/movies");
  }

  return (
    <AuthPage
      title="Рады видеть!"
      question="Еще не зарегистрированы?"
      linkPath="/signup"
      linkName="Регистрация"
    >
      <form className="form login-form" name="login-form">
        <fieldset className="login__field">
          <Input
            name="email"
            label="E-mail"
            type="email"
            placeholder="Ваш e-mail"
            isValid={true}
            defValue="pochta@yandex.ru|"
          />
          <Input
            name="password"
            label="Пароль"
            type="password"
            placeholder="Ваш пароль"
            isValid={true}
          />
        </fieldset>
        <button
          className="login__submit"
          type="submit"
          onClick={navigateToMovies}
        >
          Войти
        </button>
      </form>
    </AuthPage>
  );
}
