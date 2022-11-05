import "./App.css";
import { useState } from "react";
import Main from "../Main/Main";
import { Routes, Route } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import Layout from "../Layout/Laout";
import Movies from "../Movies/Movies";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="page">
      <Routes>
        <Route path="/signin" />
        <Route path="signup" />
        <Route
          path="/"
          element={<Layout isLogin={isLogin} setIsLogin={setIsLogin} />}
        >
          {/* защита */}
          <Route index element={<Main isLogin={isLogin} />} />
          <Route path="/movies" element={<Movies />} />
          {/* тут настройки профиля */}
          {/* сохраненки */}
          {/* защита */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

// нажатие на логотип ведёт на страницу «О проекте»;
// нажатие на «Фильмы» — на роут /movies;
// нажатие на «Сохранённые фильмы» — на роут /saved-movies;
// нажатие на «Регистрация», «Авторизация», «Аккаунт» — на соответствующие роуты /signup, /signin и /profile.

// шрифты + проверить жирность
// проверить все картинки на наличие необходимых свойств css

// все ссылки должны быть cursor pointer

// лого при signin обрезается
