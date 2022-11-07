import "./Profile.css";

export default function Profile() {
  return (
    <section className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className="profile__form">
        <fieldset className="profile__field">
          <div className="profile__wrapper">
            <label className="profile__label">Имя</label>
            <input
              className="profile__input"
              type="text"
              name="username"
              id="username"
              minLength="2"
              maxLength="30"
              defaultValue={"Виталий"}
              required
              autoComplete="off"
            />
          </div>
          <div className="profile__wrapper">
            <label className="profile__label">E-mail</label>
            <input
              className="profile__input"
              type="email"
              name="email"
              id="email"
              minLength="2"
              maxLength="30"
              defaultValue={"pochta@yandex.ru"}
              required
              autoComplete="off"
            />
          </div>
        </fieldset>
        <button className="profile__edit" to="">
          Редактировать
        </button>
        <button className="profile__logout" to="/">
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
}
