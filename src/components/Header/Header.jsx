import "./Header.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

export default function Header({ className }) {
  return (
    <header className={className}>
      <Link to="/" className="header__image" />
      <Navigation />
    </header>
  );
}
