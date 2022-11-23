import { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies({
  isLoading,
  getSavedMovies,
  handleDeleteMovie,
  saved,
}) {
  // const [filtredMovies, setFiltredMovies] = useState([]);

  // подтягивание сохраненок
  useEffect(() => {
    // drawMovies();
    getSavedMovies();
  }, []);

  // async function drawMovies() {
  //   await getSavedMovies();
  //   // setFiltredMovies(JSON.parse(localStorage.getItem("savedMovies")).data);
  // }

  return (
    <>
      <SearchForm />
      <MoviesCardList
        isLoading={isLoading}
        // filtredMovies={filtredMovies}
        filtredMovies={saved}
        handleDeleteMovie={handleDeleteMovie}
      />
    </>
  );
}
