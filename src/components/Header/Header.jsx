import "./Header.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

export default function Header({ className, loggedIn, isOpen, setIsOpen }) {
  return (
    <header className={className}>
      <Link to='/' className='header__image' />
      <Navigation loggedIn={loggedIn} isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}
