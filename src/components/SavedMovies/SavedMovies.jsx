import { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies({
  isLoading,
  getSavedMovies,
  serverError,
  handleDeleteMovie,
  savedMovies,
}) {
  const [searchText, setSearchText] = useState("");
  const [filtredMovies, setFiltredMovies] = useState([]);
  const [isEmpty, setIsEmpty] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // подтягивание сохраненок
  useEffect(() => {
    getSavedMovies();
  }, []);

  function reverse() {
    if (!isChecked) {
      setFiltredMovies(
        savedMovies
          ?.filter(
            (movie) =>
              movie.nameRU.toLowerCase().includes(searchText?.toLowerCase()) ||
              movie.nameEN.toLowerCase().includes(searchText?.toLowerCase())
          )
          .reverse()
      );
    } else {
      const shorts = savedMovies?.filter((movie) => movie.duration < 40);
      setFiltredMovies(
        shorts
          ?.filter(
            (short) =>
              short.nameRU.toLowerCase().includes(searchText?.toLowerCase()) ||
              short.nameEN.toLowerCase().includes(searchText?.toLowerCase())
          )
          .reverse()
      );
    }
  }

  useEffect(() => {
    reverse();
  }, [savedMovies]);

  // чекбокс
  useEffect(() => {
    getFiltred(searchText || "", isChecked);
    reverse();
  }, [isChecked]);

  useEffect(() => {
    if (!filtredMovies?.length) {
      setIsEmpty("Ничего не найдено :(");
    } else {
      setIsEmpty("");
    }
  }, [filtredMovies]);

  // фильтр
  function getFiltred(text, short) {
    if (!short) {
      setFiltredMovies(
        savedMovies?.filter(
          (movie) =>
            movie.nameRU.toLowerCase().includes(text?.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(text?.toLowerCase())
        )
      );
    } else {
      const shorts = savedMovies?.filter((movie) => movie.duration < 40);
      setFiltredMovies(
        shorts?.filter(
          (short) =>
            short.nameRU.toLowerCase().includes(text?.toLowerCase()) ||
            short.nameEN.toLowerCase().includes(text?.toLowerCase())
        )
      );
    }
  }

  // сабмит формы поиска
  function handleSubmit() {
    // e.preventDefault();
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
          filtredMovies={filtredMovies}
          handleDeleteMovie={handleDeleteMovie}
        />
      )}
    </>
  );
}
