import { useDebugValue, useEffect, useState } from "react";
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
  const [filtredMovies, setFiltredMovies] = useState(savedMovies);
  const [isEmpty, setIsEmpty] = useState("");
  const [isChecked, setIsChecked] = useState(() => {
    if (JSON.parse(localStorage.getItem("isSavedShort"))?.short) {
      return true;
    } else {
      return false;
    }
  });
  // подтягивание сохраненок
  useEffect(() => {
    getSavedMovies();
  }, []);

  useEffect(() => {
    const req = JSON.parse(localStorage.getItem("query-saved"))?.req;

    setFiltredMovies(savedMovies.reverse());
    getFiltred(req || "", isChecked);
    setSearchText(req || "");
  }, [savedMovies]);

  // чекбокс
  useEffect(() => {
    getFiltred(searchText || "", isChecked);
    saveShort();
  }, [isChecked]);

  useEffect(() => {
    if (!filtredMovies?.length && !localStorage.getItem("query-saved")) {
      return;
    } else if (!filtredMovies?.length) {
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

  function saveQuery() {
    localStorage.setItem(
      "query-saved",
      JSON.stringify({
        req: searchText,
      })
    );
  }

  function saveShort() {
    localStorage.setItem(
      "isSavedShort",
      JSON.stringify({
        short: isChecked,
      })
    );
  }

  // сабмит формы поиска
  function handleSubmit(e) {
    e.preventDefault();
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
          filtredMovies={filtredMovies}
          handleDeleteMovie={handleDeleteMovie}
        />
      )}
    </>
  );
}
