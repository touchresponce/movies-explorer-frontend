import "./Layout.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <Header
        className={location.pathname === "/" ? "header header-color" : "header"}
      />
      <main className="main">
        <Outlet />
      </main>
      {location.pathname === "/profile" ? null : <Footer />}
    </>
  );
}
