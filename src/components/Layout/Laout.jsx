import "./Layout.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Layout({ isLogin }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const setActive = ({ isActive }) =>
    isActive ? "sidebar__link sidebar__link_active" : "sidebar__link";

  return (
    <>
      <Header
        className={location.pathname === "/" ? "header header-color" : "header"}
        isLogin={isLogin}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <main className="main">
        <Outlet />
      </main>
      {location.pathname === "/profile" ? null : <Footer />}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar__wrapper">
          <nav className="sidebar__nav">
            <NavLink
              to="/"
              className={setActive}
              onClick={() => setIsOpen(!isOpen)}
            >
              Главная
            </NavLink>
            <NavLink
              to="/movies"
              className={setActive}
              onClick={() => setIsOpen(!isOpen)}
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className={setActive}
              onClick={() => setIsOpen(!isOpen)}
            >
              Сохранённые фильмы
            </NavLink>
          </nav>
          <Link
            to="/profile"
            className="sidebar__button"
            onClick={() => setIsOpen(!isOpen)}
          >
            Аккаунт
            <div className="navigation__icon" />
          </Link>
        </div>
      </div>
    </>
  );
}
