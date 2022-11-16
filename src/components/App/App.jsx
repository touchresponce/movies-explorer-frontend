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
import auth from "../../utils/auth";

export default function App() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [serverError, setServerError] = useState("");

  // регистрация
  function handleRegistration({ name, email, password }) {
    auth
      .register(name, email, password)
      .then(() => navigate("/signin"))
      .catch((err) => {
        if (err === 409) {
          setServerError("Пользователь с таким email уже существует");
        } else if (err === 400) {
          setServerError("Переданы некорректные данные");
        }
      });
    // .finally(() => {
    //   setRegistration(true);
    //   setTimeout(() => {
    //     setRegistration(false);
    //   }, 3000);
    // });
  }

  // вход
  function handleLogin({ email, password }) {
    auth
      .authorize({
        email: email,
        password: password,
      })
      .then((data) => {
        if (data.token) {
          setIsLogin(true);
          tokenCheck();
        }
      })
      .catch((err) => console.log(err));
  }

  // проверка токена
  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getToken(jwt)
        .then(() => setIsLogin(true))
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="page">
      <Routes>
        <Route
          path="/signin"
          element={
            <Login handleLogin={handleLogin} serverError={serverError} />
          }
        />
        <Route
          path="signup"
          element={
            <Register
              handleRegistration={handleRegistration}
              serverError={serverError}
            />
          }
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
// допилить вход
