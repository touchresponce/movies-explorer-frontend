import "./Register.css";
import Input from "../Input/Input";
import AuthPage from "../AuthPage/AuthPage";

export default function Register() {
  return (
    <AuthPage
      title="Добро пожаловать!"
      question="Уже зарегистрированы?"
      linkPath="/signin"
      linkName="Войти"
    >
      <form className="form register-form" name="register-form">
        <fieldset className="register__field">
          <Input
            name="name"
            label="Имя"
            type="text"
            placeholder="Ваше имя"
            defValue="Виталий"
            isValid={true}
          />
          <Input
            name="email"
            label="E-mail"
            type="email"
            placeholder="Ваш e-mail"
            defValue="pochta@yandex.ru"
            isValid={true}
          />
          <Input
            name="password"
            label="Пароль"
            type="password"
            placeholder="Ваш пароль"
            defValue="Предположим здесь введен пароль"
          />
        </fieldset>
        <button className="register__submit" type="submit">
          Зарегистрироваться
        </button>
      </form>
    </AuthPage>
  );
}
