import MoreButton from "../MoreButton/MoreButton";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

export default function Movies() {
  return (
    <>
      <SearchForm />
      <MoviesCardList />
      <MoreButton />
    </>
  );
}
