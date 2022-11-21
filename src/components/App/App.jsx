import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Main from "../Main/Main";
import NotFound from "../NotFound/NotFound";
import Layout from "../Layout/Laout";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import auth from "../../utils/auth";
import mainApi from "../../utils/MainApi";
import * as movieApi from "../../utils/MoviesApi";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";

export default function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [serverError, setServerError] = useState(""); // ошибка от сервера для отображения в логине\регистрации
  const [serverResponce, setServerResponce] = useState(""); // ответ для профайла
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      setLoggedIn(true);
      Promise.all([mainApi.getUserInfo()])
        .then(([apiUser]) => {
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
        handleLogin({ email, password });
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
  function handleLogout() {
    setLoggedIn(false);
    localStorage.clear();
    setCurrentUser({});
  }

  // редактирование пользователя
  function handleUserUpdate({ name, email }) {
    mainApi
      .updateUserInfo({ name, email })
      .then(() => {
        setCurrentUser({ name, email });
        setServerResponce("Данные успешно обновлены");
      })
      .catch((err) => {
        if (err === 400) {
          setServerError("Переданы некорректные данные");
        } else {
          return setServerError("Что-то пошло не так...");
        }
      })
      .finally(() => setTimeout(() => setServerResponce(""), 3000));
  }

  // все фильмы
  function getAllMovies() {
    if (localStorage.getItem("allMovies")) {
      return;
    }

    setIsLoading(true);

    return movieApi
      .getMovies()
      .then((movies) => {
        localStorage.setItem("allMovies", JSON.stringify(movies));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
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
            <Route
              path='/movies'
              element={
                <Movies isLoading={isLoading} getAllMovies={getAllMovies} />
              }
              exact
            />
            <Route path='/saved-movies' element={<SavedMovies />} />
            <Route
              path='/profile'
              element={
                <Profile
                  handleLogout={handleLogout}
                  handleUserUpdate={handleUserUpdate}
                  serverError={serverError}
                  setServerError={setServerError}
                  serverResponce={serverResponce}
                  setServerResponce={setServerResponce}
                />
              }
            />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

// отображение 3 карточек, кнопка показать еще подгружает след ряд фильмов
// чекбокс на короткометражки
// лайки\дизлайки\отображение лайкнутых
// прелоадер блеать при загрузке фильмов как минимум

// отображение времени на фильмах блеать
// нажатие на картинку ведет на ютуб трейлер блеать

// блеать

// плывет верстка при ошибках в форме регистрации\авторизации
// плывет верстка при ответе сервера в profile
// обработать ошибки при входе в app

// До получения данных блок содержит прелоадер. Если ничего не найдено,
// на месте прелоадера появляется надпись «Ничего не найдено».
// Если в процессе получения и обработки данных происходит ошибка, в окне
// результатов выводится надпись: «Во время запроса произошла ошибка.
// Возможно, проблема с соединением или сервер недоступен. Подождите
// немного и попробуйте ещё раз».
