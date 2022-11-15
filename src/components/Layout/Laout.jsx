import "./Layout.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Layout({ isLogin }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

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
      <div className={`popup ${isOpen ? "open" : ""}`}>
        <div className="popup__wrapper"></div>
      </div>
    </>
  );
}
