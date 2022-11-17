import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
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
import mainApi from "../../utils/MainApi";
import * as movieApi from "../../utils/MoviesApi";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";

export default function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [serverError, setServerError] = useState(""); // ошибка от сервера для отображения в логине\регистрации
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      setLoggedIn(true);
      Promise.all([mainApi.getUserInfo(), movieApi.getMovies()])
        .then(([apiUser, apiMovies]) => {
          setCurrentUser({
            name: apiUser.user.name,
            email: apiUser.user.email,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  // регистрация
  function handleRegistration({ name, email, password }) {
    auth
      .register(name, email, password)
      .then(() => {
        navigate("/signin");
        setServerError("");
      })
      .catch((err) => {
        if (err === 409) {
          return setServerError("Пользователь с таким email уже существует");
        } else if (err === 400) {
          return setServerError("Переданы некорректные данные");
        } else {
          return setServerError("Что-то пошло не так...");
        }
      });
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
          setLoggedIn(true);
          navigate("/movies");
          setServerError("");
        }
      })
      .catch((err) => {
        if (err === 401) {
          return setServerError("Неправильные почта или пароль");
        } else {
          return setServerError("Что-то пошло не так...");
        }
      });
  }

  // выход
  function signOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setCurrentUser({});
  }

  return (
    <div className='page'>
      <Routes>
        <Route
          path='/signin'
          element={
            <Login
              handleLogin={handleLogin}
              serverError={serverError}
              setServerError={setServerError}
            />
          }
        />
        <Route
          path='/signup'
          element={
            <Register
              handleRegistration={handleRegistration}
              serverError={serverError}
              setServerError={setServerError}
            />
          }
        />
        {/* общая верстка шапка подвал */}
        <Route path='/' element={<Layout loggedIn={loggedIn} />}>
          <Route index element={<Main />} />
          {/* защита */}
          <Route
            element={
              // приватные роуты с контекстом
              <CurrentUserContext.Provider value={currentUser}>
                <ProtectedRoutes loggedIn={loggedIn} />
              </CurrentUserContext.Provider>
            }
          >
            <Route path='/movies' element={<Movies />} exact />
            <Route path='/saved-movies' element={<SavedMovies />} />
            <Route
              path='/profile'
              element={<Profile setLoggedIn={setLoggedIn} signOut={signOut} />}
            />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}
