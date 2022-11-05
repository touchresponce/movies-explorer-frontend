import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

export default function SearchForm() {
  return (
    <section className="search">
      <form className="form search__form">
        <div className="search__wrapper">
          <input
            className="search__input"
            type="text"
            id="search"
            name="search"
            placeholder="Фильм"
            required
          />
          <button className="search__button">Поиск</button>
          <span></span>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
}
