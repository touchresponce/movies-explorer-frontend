import "./Navigation.css";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" ? (
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
              className="navigation__link navigation__link_type_profile"
              to="/profile"
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
