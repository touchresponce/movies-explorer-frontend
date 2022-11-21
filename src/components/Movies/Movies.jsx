import { useEffect, useState } from "react";
import MoreButton from "../MoreButton/MoreButton";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

export default function Movies({ isLoading, getAllMovies }) {
  const [searchText, setSearchText] = useState("");
  const [filtredMovies, setFiltredMovies] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setSearchText(JSON.parse(localStorage.getItem("movies-query"))?.req);
  }, []);

  useEffect(() => {
    getFiltred(JSON.parse(localStorage.getItem("movies-query"))?.req);
  }, []);

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
      <MoviesCardList isLoading={isLoading} filtredMovies={filtredMovies} />
      <MoreButton />
    </>
  );
}
