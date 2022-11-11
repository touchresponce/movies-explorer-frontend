import "./Header.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { useState } from "react";

export default function Header({ className }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={className}>
      <Link to="/" className="header__image" />
      <Navigation />
      <div
        className={`burger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="burger__button"></div>
      </div>
    </header>
  );
}
