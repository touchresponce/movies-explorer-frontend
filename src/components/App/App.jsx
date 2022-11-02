import "./App.css";
import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { Routes, Route } from "react-router-dom";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="page">
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <Routes>
        <Route path="/" element={<Main isLogin={isLogin} />} />
        {/* в каждый роут должен быть мэйн */}
      </Routes>
      {/* здесь футер */}
    </div>
  );
}

export default App;

// по роуту / отображается страница «О проекте»;
// по роуту /movies отображается страница «Фильмы»;
// по роуту /saved-movies отображается страница «Сохранённые фильмы»;
// по роуту /profile отображается страница с профилем пользователя;
// по роутам /signin и /signup отображаются страницы авторизации и регистрации.

// нажатие на логотип ведёт на страницу «О проекте»;
// нажатие на «Фильмы» — на роут /movies;
// нажатие на «Сохранённые фильмы» — на роут /saved-movies;
// нажатие на «Регистрация», «Авторизация», «Аккаунт» — на соответствующие роуты /signup, /signin и /profile.

// <div className="page">
//   <Routes>
//     <Route path='/' element={<Main/>} />
//     <Route path='/movies' element={<Movies/>} />
//     <Route path='/saved-movies' element={<SavedMovies />} />
//     <Route path='/profile' element={<SavedMovies />} />
//     <Route path='/saved-movies' element={<SavedMovies />} />
//       защита
//         <Route path='/signin' element={}/>
//         <Route path='/signup' element={}/>
//       защита
//   </Routes>
// </div>
