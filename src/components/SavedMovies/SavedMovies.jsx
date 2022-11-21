import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies({ setSearchText }) {
  return (
    <>
      <SearchForm setSearchText={setSearchText} />
      <MoviesCardList />
    </>
  );
}
