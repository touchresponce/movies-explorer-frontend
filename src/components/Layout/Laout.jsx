import "./Layout.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout({ isLogin, setIsLogin }) {
  return (
    <>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
