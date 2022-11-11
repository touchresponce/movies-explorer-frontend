import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main";
import NotFound from "../NotFound/NotFound";
import Layout from "../Layout/Laout";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";

export default function App() {
  return (
    <div className="page">
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="signup" element={<Register />} />
        {/* общая верстка - шапка, подвал */}
        <Route path="/" element={<Layout />}>
          {/* защита */}
          <Route index element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          {/* защита */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

// анимировать все инпуты при фокусе
// не забыть про кнопку "Узнать больше" на главной странице

// добавить прелоадер

// попап при разрешении 768
