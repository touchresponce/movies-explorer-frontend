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
  const [serverError, setServerError] = useState(""); // ошибка от сервера
  const [serverResponce, setServerResponce] = useState(""); // ответ для профайла
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

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

  // получить все фильмы
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
      .catch(() => {
        setServerError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      })
      .finally(() => {
        setIsLoading(false);
        setTimeout(() => setServerError(""), 3000);
      });
  }

  // получить сохраненки
  function getSavedMovies() {
    setIsLoading(true);

    mainApi
      .getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies.data);
      })
      .catch(() => {
        setServerError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      })
      .finally(() => {
        setIsLoading(false);
        setTimeout(() => setServerError(""), 3000);
      });
  }

  useEffect(() => {
    loggedIn && getSavedMovies();
  }, [loggedIn]);

  // сохранить фильм
  function handleSaveMovie(movie) {
    if (
      savedMovies.some((state) => state.movieId === movie.id) ||
      savedMovies.some((state) => state.id === movie.id)
    )
      return;

    mainApi
      .saveMovie({
        country: movie.country || "Not Country",
        director: movie.director || "Not director",
        duration: movie.duration || "0",
        year: movie.year || "0000",
        description: movie.description || "Not description",
        image: movie.image
          ? `https://api.nomoreparties.co${movie.image.url}`
          : "No Image",
        trailerLink: movie.trailerLink || "https://www.youtube.com/",
        thumbnail: movie.image
          ? `https://api.nomoreparties.co${movie.image.url}`
          : "No Image",
        movieId: movie.id,
        nameRU: movie.nameRU || "Not nameRU",
        nameEN: movie.nameEN || "Not nameEN",
      })
      .then((res) => {
        console.log(res);
        getSavedMovies();
        // setSavedMovies([...savedMovies, movie]);
      })
      .catch((err) => console.log(err));
  }

  // удалить фильм из сохраненок
  function handleDeleteMovie(id) {
    mainApi
      .deleteMovie(id)
      .then((res) => {
        console.log(res);
        getSavedMovies();
        setSavedMovies((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((err) => console.log(err));
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
                <Movies
                  isLoading={isLoading}
                  getAllMovies={getAllMovies}
                  serverError={serverError}
                  handleSaveMovie={handleSaveMovie}
                  handleDeleteMovie={handleDeleteMovie}
                  savedMovies={savedMovies}
                />
              }
              exact
            />
            <Route
              path='/saved-movies'
              element={
                <SavedMovies
                  isLoading={isLoading}
                  getSavedMovies={getSavedMovies}
                  serverError={serverError}
                  handleDeleteMovie={handleDeleteMovie}
                  savedMovies={savedMovies}
                />
              }
            />
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
