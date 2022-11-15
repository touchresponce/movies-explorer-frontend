import "./Header.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

export default function Header({ className, isLogin, isOpen, setIsOpen }) {
  return (
    <header className={className}>
      <Link to="/" className="header__image" />
      <Navigation isLogin={isLogin} isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}
