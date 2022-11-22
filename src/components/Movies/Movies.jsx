import { useEffect, useState } from "react";
import "./Movies.css";
import MoreButton from "../MoreButton/MoreButton";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

export default function Movies({ isLoading, getAllMovies, serverError }) {
  const [searchText, setSearchText] = useState("");
  const [filtredMovies, setFiltredMovies] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isEmpty, setIsEmpty] = useState("");
  const [displayedMovies, setDisplayedMovies] = useState(() => calculateSize());

  const [AddMoreMovies, setMoreMovies] = useState(() => {
    if (window.innerWidth > 1080) {
      return 3;
    } else if (window.innerWidth > 768) {
      return 2;
    } else if (window.innerWidth > 320) {
      return 2;
    }
  });

  function calculateSize() {
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

  // сброс колва фильмов при смене запроса
  useEffect(() => setDisplayedMovies(calculateSize()), [filtredMovies]);

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

  // отобразить больше фильмов
  function handleMore() {
    setDisplayedMovies((prev) => prev + AddMoreMovies);
  }

  // подтягивание запроса\отобр фильмов при переходе по страницам
  useEffect(() => {
    setSearchText(JSON.parse(localStorage.getItem("movies-query"))?.req);
  }, []);
  useEffect(() => {
    getFiltred(JSON.parse(localStorage.getItem("movies-query"))?.req);
  }, []);

  useEffect(() => {
    if (!filtredMovies?.length && !localStorage.getItem("movies-query")) {
      return;
    } else if (!filtredMovies?.length) {
      setIsEmpty("Ничего не найдено :(");
    } else {
      setIsEmpty("");
    }
  }, [filtredMovies]);

  function getFiltred(text) {
    setFiltredMovies(
      JSON.parse(localStorage.getItem("allMovies"))?.filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(text?.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(text?.toLowerCase())
      )
    );
  }

  // сабмит формы поиска
  async function handleSubmit(e) {
    e.preventDefault();

    await getAllMovies();

    localStorage.setItem(
      "movies-query",
      JSON.stringify({
        req: searchText,
        checkBox: isChecked,
      })
    );

    getFiltred(searchText);
  }

  return (
    <>
      <SearchForm
        searchText={searchText}
        setSearchText={setSearchText}
        handleSubmit={handleSubmit}
        setIsChecked={setIsChecked}
      />
      {serverError ? <p className='movies__error'>{serverError}</p> : null}
      {isEmpty ? (
        <p className='movies__message'>{isEmpty}</p>
      ) : (
        <MoviesCardList isLoading={isLoading} filtredMovies={dataMovies} />
      )}
      {filtredMovies?.length > dataMovies?.length ? (
        <MoreButton handleMore={handleMore} />
      ) : null}
    </>
  );
}
