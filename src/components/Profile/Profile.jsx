import "./Profile.css";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useFormValidation from "../../utils/useFormValidation";

export default function Profile({
  handleLogout,
  handleUserUpdate,
  serverError,
  setServerError,
  serverResponce,
  setServerResponce,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues, setIsValid } =
    useFormValidation();

  useEffect(() => {
    setServerError("");
  }, []);

  // подтягивание для проверки
  useEffect(() => {
    setValues({
      username: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser]);

  // Провка на изменение и валидность
  useEffect(() => {
    const isChangeName = values.username !== currentUser.name;
    const isChangeEmail = values.email !== currentUser.email;

    values.username &&
    values.email &&
    (isChangeName || isChangeEmail) &&
    isValid
      ? setIsValid(true)
      : setIsValid(false);
  }, [values]);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleUserUpdate({
      name: values.username,
      email: values.email,
    });
  }

  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, {currentUser.name}</h1>
      <form className='profile__form' onSubmit={handleSubmit}>
        <fieldset className='profile__field'>
          <div className='profile__wrapper'>
            <label className='profile__label'>Имя</label>
            <input
              className={`profile__input ${
                errors.username ? "profile__input_color" : ""
              }`}
              type='text'
              name='username'
              id='username'
              minLength='2'
              maxLength='30'
              onChange={(evt) => handleChange(evt)}
              defaultValue={currentUser.name || ""}
              placeholder='Ваше имя'
              required
              autoComplete='off'
            />
            <span
              className={`profile__error ${
                errors.username ? `profile__error_active` : ""
              }`}
            >
              {errors.username}
            </span>
          </div>
          <div className='profile__wrapper'>
            <label className='profile__label'>E-mail</label>
            <input
              className={`profile__input ${
                errors.email ? "profile__input_color" : ""
              }`}
              type='email'
              name='email'
              id='email'
              minLength='2'
              maxLength='30'
              onChange={(evt) => handleChange(evt)}
              defaultValue={currentUser.email || ""}
              placeholder='Ваш e-mail'
              required
              autoComplete='off'
            />
            <span
              className={`profile__error ${
                errors.email ? `profile__error_active` : ""
              }`}
            >
              {errors.email && "Некорректный адрес почты"}
            </span>
          </div>
        </fieldset>
        <div className='profile__buttons-wrapper'>
          <span
            className={`profile__responce ${
              serverError
                ? "profile__responce_type_error"
                : "" || serverResponce
                ? "profile__responce_type_success"
                : ""
            }`}
          >
            {serverError || serverResponce || ""}
          </span>
          <button
            className={`profile__submit ${
              !isValid ? "profile__submit_disabled" : ""
            }`}
            type='submit'
            disabled={!isValid}
          >
            Редактировать
          </button>
          <button
            className='profile__logout'
            type='button'
            onClick={() => handleLogout()}
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
}
