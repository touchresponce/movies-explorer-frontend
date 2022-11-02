import "./Navigation.css";
import { Link } from "react-router-dom";

export default function Navigation({ isLogin }) {
  return (
    <>
      {isLogin ? (
        <nav className="navigation logged">
          <div>
            <Link
              className="navigation__link navigation__link_type_films"
              to="/movies"
            >
              Фильмы
            </Link>
            <Link
              className="navigation__link navigation__link_type_save"
              to="/saved-movies"
            >
              Сохранённые фильмы
            </Link>
          </div>
          <div>
            <Link
              to={"/account"}
              className="navigation__link navigation__link_type_profile"
            >
              Аккаунт
              <div className="navigation__icon" />
            </Link>
          </div>
        </nav>
      ) : (
        <nav className="navigation">
          <Link
            className="navigation__link navigation__link_type_registration"
            to={"/signup"}
          >
            Регистрация
          </Link>
          <Link to={"/signin"}>
            <button className="navigation__button">Войти</button>
          </Link>
        </nav>
      )}
    </>
  );
}
