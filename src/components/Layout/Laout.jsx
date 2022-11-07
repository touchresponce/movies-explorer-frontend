import "./Layout.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout({ isLogin, setIsLogin }) {
  const location = useLocation();

  return (
    <>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <main className="main">
        <Outlet />
      </main>
      {location.pathname === "/profile" ? null : <Footer />}
    </>
  );
}
