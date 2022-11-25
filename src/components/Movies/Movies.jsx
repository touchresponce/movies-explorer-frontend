import { useEffect, useState } from "react";
import "./Movies.css";
import MoreButton from "../MoreButton/MoreButton";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

export default function Movies({
  isLoading,
  getAllMovies,
  serverError,
  handleSaveMovie,
  handleDeleteMovie,
  savedMovies,
}) {
  const [searchText, setSearchText] = useState("");
  const [filtredMovies, setFiltredMovies] = useState([]);
  const [isEmpty, setIsEmpty] = useState("");
  const [isChecked, setIsChecked] = useState(() => {
    if (JSON.parse(localStorage.getItem("isMoviesShort"))?.short) {
      return true;
    } else {
      return false;
    }
  });

  const [displayedMovies, setDisplayedMovies] = useState(() =>
    calculateMovies()
  );

  const [AddMoreMovies, setMoreMovies] = useState(() => {
    if (window.innerWidth > 1080) {
      return 3;
    } else if (window.innerWidth > 768) {
      return 2;
    } else if (window.innerWidth > 320) {
      return 2;
    }
  });

  function calculateMovies() {
    if (window.innerWidth > 1280) {
      return 12;
    } else if (window.innerWidth > 1080) {
      return 9;
    } else if (window.innerWidth > 768) {
      return 8;
    } else if (window.innerWidth > 320) {
      return 5;
    }
  }

  function resizeWindow() {
    setTimeout(() => {
      if (window.innerWidth > 1280) {
        setDisplayedMovies(12);
        setMoreMovies(3);
      } else if (window.innerWidth > 1080) {
        setDisplayedMovies(9);
        setMoreMovies(3);
      } else if (window.innerWidth > 768) {
        setDisplayedMovies(8);
        setMoreMovies(2);
      } else if (window.innerWidth > 320) {
        setDisplayedMovies(5);
        setMoreMovies(2);
      }
    }, 300);
  }

  useEffect(() => {
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  const dataMovies = filtredMovies?.slice(0, displayedMovies);

  // чекбокс
  useEffect(() => {
    getFiltred(searchText || "", isChecked);
    saveShort();
  }, [isChecked]);

  // подтягивание запроса\отобр фильмов при переходе по страницам
  // useEffect(() => {
  //   setSearchText(JSON.parse(localStorage.getItem("query"))?.req);
  // }, []);
  useEffect(() => {
    getFiltred(JSON.parse(localStorage.getItem("query"))?.req, isChecked);
  }, []);

  useEffect(() => {
    if (!filtredMovies?.length && !localStorage.getItem("query")) {
      return;
    } else if (!filtredMovies?.length) {
      setIsEmpty("Ничего не найдено :(");
    } else {
      setIsEmpty("");
    }

    // сброс колва фильмов при смене запроса
    setDisplayedMovies(calculateMovies());
  }, [filtredMovies]);

  // фильтр
  function getFiltred(text, short) {
    const movies = JSON.parse(localStorage.getItem("allMovies"));

    if (!short) {
      setFiltredMovies(
        movies?.filter(
          (movie) =>
            movie.nameRU.toLowerCase().includes(text?.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(text?.toLowerCase())
        )
      );
    } else {
      const shorts = movies?.filter((movie) => movie.duration < 40);
      setFiltredMovies(
        shorts?.filter(
          (short) =>
            short.nameRU.toLowerCase().includes(text?.toLowerCase()) ||
            short.nameEN.toLowerCase().includes(text?.toLowerCase())
        )
      );
    }
  }

  function saveQuery() {
    localStorage.setItem(
      "query",
      JSON.stringify({
        req: searchText,
      })
    );
  }

  function saveShort() {
    localStorage.setItem(
      "isMoviesShort",
      JSON.stringify({
        short: isChecked,
      })
    );
  }

  // отобразить больше фильмов
  function handleMore() {
    setDisplayedMovies((prev) => prev + AddMoreMovies);
  }

  // сабмит формы поиска
  async function handleSubmit() {
    // e.preventDefault();
    await getAllMovies();
    saveQuery();
    getFiltred(searchText, isChecked);
  }

  return (
    <>
      <SearchForm
        searchText={searchText}
        setSearchText={setSearchText}
        handleSubmit={handleSubmit}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
      {serverError ? <p className='movies__error'>{serverError}</p> : null}
      {isEmpty ? (
        <p className='movies__message'>{isEmpty}</p>
      ) : (
        <MoviesCardList
          isLoading={isLoading}
          filtredMovies={dataMovies}
          handleSaveMovie={handleSaveMovie}
          handleDeleteMovie={handleDeleteMovie}
          savedMovies={savedMovies}
        />
      )}
      {filtredMovies?.length > dataMovies?.length ? (
        <MoreButton handleMore={handleMore} />
      ) : null}
    </>
  );
}
