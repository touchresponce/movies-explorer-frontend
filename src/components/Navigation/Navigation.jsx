import "./Navigation.css";
import { Link, NavLink } from "react-router-dom";
import BurgerButton from "../BurgerButton/BurgerButton";

export default function Navigation({ loggedIn, isOpen, setIsOpen }) {
  return (
    <>
      {loggedIn ? (
        <>
          <nav className='navigation logged display'>
            <div>
              <NavLink
                // className='navigation__link navigation__link_type_films'
                className={({ isActive }) =>
                  isActive
                    ? "navigation__link navigation__link_type_films navigation__link_active"
                    : "navigation__link navigation__link_type_films"
                }
                to='/movies'
              >
                Фильмы
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "navigation__link navigation__link_type_save navigation__link_active"
                    : "navigation__link navigation__link_type_save"
                }
                to='/saved-movies'
              >
                Сохранённые фильмы
              </NavLink>
            </div>
            <div>
              <Link
                className='navigation__link navigation__link_type_profile'
                to='/profile'
              >
                Аккаунт
                <div className='navigation__icon' />
              </Link>
            </div>
          </nav>
          <BurgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
      ) : (
        <nav className='navigation'>
          <Link
            className='navigation__link navigation__link_type_registration'
            to={"/signup"}
          >
            Регистрация
          </Link>
          <Link to={"/signin"}>
            <button className='navigation__button'>Войти</button>
          </Link>
        </nav>
      )}
    </>
  );
}
