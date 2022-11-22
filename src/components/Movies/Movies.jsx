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
        <MoviesCardList isLoading={isLoading} filtredMovies={filtredMovies} />
      )}
      <MoreButton />
    </>
  );
}
