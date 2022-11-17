import "./Register.css";
import Input from "../Input/Input";
import AuthPage from "../AuthPage/AuthPage";
import useFormValidation from "../../utils/useFormValidation";
import { EMAIL_PATTERN } from "../../utils/constants";
import { useEffect } from "react";

export default function Register({
  handleRegistration,
  serverError,
  setServerError,
}) {
  const { values, handleChange, errors, isValid } = useFormValidation();

  useEffect(() => {
    setServerError("");
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegistration({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  }

  return (
    <AuthPage
      title='Добро пожаловать!'
      question='Уже зарегистрированы?'
      linkPath='/signin'
      linkName='Войти'
    >
      <form
        className='form register-form'
        name='register-form'
        onSubmit={handleSubmit}
      >
        <fieldset className='register__field'>
          <Input
            name='name'
            label='Имя'
            type='text'
            placeholder='Ваше имя'
            minLength='2'
            isValid={isValid}
            errors={errors.name}
            onChange={(evt) => handleChange(evt)}
          />
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
        <span className='register__span'>{serverError}</span>
        <button
          className={`register__submit ${
            !isValid ? "register__submit_disabled" : ""
          }`}
          type='submit'
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
      </form>
    </AuthPage>
  );
}
