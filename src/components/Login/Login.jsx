import "./Login.css";
import Input from "../Input/Input";
import AuthPage from "../AuthPage/AuthPage";
import useFormValidation from "../../utils/useFormValidation";
import { EMAIL_PATTERN } from "../../utils/constants";
import { useEffect } from "react";

export default function Login({ handleLogin, serverError, setServerError }) {
  const { values, handleChange, errors, isValid } = useFormValidation();

  useEffect(() => {
    setServerError("");
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <AuthPage
      title='Рады видеть!'
      question='Еще не зарегистрированы?'
      linkPath='/signup'
      linkName='Регистрация'
    >
      <form
        className='form login-form'
        name='login-form'
        onSubmit={handleSubmit}
      >
        <fieldset className='login__field'>
          <Input
            name='email'
            label='E-mail'
            type='email'
            placeholder='Ваш e-mail'
            minLength='6'
            isValid={isValid}
            errors={errors.email}
            pattern={EMAIL_PATTERN}
            onChange={(evt) => handleChange(evt)}
          />
          <Input
            name='password'
            label='Пароль'
            type='password'
            placeholder='Ваш пароль'
            minLength='6'
            isValid={isValid}
            errors={errors.password}
            onChange={(evt) => handleChange(evt)}
          />
        </fieldset>
        <span className='login__span'>{serverError}</span>
        <button
          className={`login__submit ${
            !isValid ? "login__submit_disabled" : ""
          }`}
          type='submit'
          disabled={!isValid}
        >
          Войти
        </button>
      </form>
    </AuthPage>
  );
}
