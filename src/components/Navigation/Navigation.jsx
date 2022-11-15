import "./Navigation.css";
import { Link } from "react-router-dom";
import BurgerButton from "../BurgerButton/BurgerButton";

export default function Navigation({ isLogin, isOpen, setIsOpen }) {
  return (
    <>
      {isLogin ? (
        <>
          <nav className="navigation logged display">
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
          <BurgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
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
