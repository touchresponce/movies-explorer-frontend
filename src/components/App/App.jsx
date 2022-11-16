import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import NotFound from "../NotFound/NotFound";
import Layout from "../Layout/Laout";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { useState } from "react";
import mainApi from "../../utils/MainApi";

export default function App() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  // регистрация
  function handleRegistration({ name, email, password }) {
    mainApi
      .register(name, email, password)
      .then(() => navigate("/signin"))
      .catch((err) => {
        console.log(err);
      });
    // .finally(() => {
    //   setRegistration(true);
    //   setTimeout(() => {
    //     setRegistration(false);
    //   }, 3000);
    // });
  }

  return (
    <div className="page">
      <Routes>
        <Route
          path="/signin"
          element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}
        />
        <Route
          path="signup"
          element={<Register handleRegistration={handleRegistration} />}
        />
        {/* общая верстка - шапка, подвал */}
        <Route path="/" element={<Layout isLogin={isLogin} />}>
          {/* защита */}
          <Route index element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route
            path="/profile"
            element={<Profile isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          {/* защита */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

// плывет верстка при ошибках в форме
