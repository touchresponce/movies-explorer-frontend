import "./Header.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

export default function Header({ isLogin, setIsLogin }) {
  return (
    <header className={`header ${!isLogin ? "header-color" : ""}`}>
      <Link
        to="/"
        className="header__image"
        onClick={() => setIsLogin(!isLogin)}
      />
      <Navigation isLogin={isLogin} />
    </header>
  );
}
