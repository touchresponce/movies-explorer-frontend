import { useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies({
  isLoading,
  getSavedMovies,
  handleDeleteMovie,
  savedMovies,
}) {
  // подтягивание сохраненок
  useEffect(() => {
    getSavedMovies();
  }, []);

  return (
    <>
      <SearchForm />
      <MoviesCardList
        isLoading={isLoading}
        filtredMovies={savedMovies}
        handleDeleteMovie={handleDeleteMovie}
      />
    </>
  );
}
