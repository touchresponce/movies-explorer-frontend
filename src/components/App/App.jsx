import "./App.css";
import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { Routes, Route } from "react-router-dom";
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="page">
      {/* <Header isLogin={isLogin} setIsLogin={setIsLogin} /> */}
      <Routes>
        {/* защита */}
        <Route path="/signin" />
        <Route path="signup" />
        {/* защита */}
        {/* общий компонент шапка подвал */}
        <Route path="/" element={<Main isLogin={isLogin} />} />
        {/* общий компонент шапка подвал */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;

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

// шрифты + проверить жирность
// проверить все картинки на наличие необходимых свойств css
