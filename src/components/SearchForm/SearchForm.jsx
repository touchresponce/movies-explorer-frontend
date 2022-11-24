import { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

export default function SearchForm({
  searchText,
  setSearchText,
  handleSubmit,
  isChecked,
  setIsChecked,
}) {
  const [isValidity, setIsValidity] = useState(false);

  function handleChange(e) {
    setSearchText(e.target.value);
    setIsValidity(e.target.checkValidity());
  }

  return (
    <section className='search'>
      <form className='form search__form' onSubmit={handleSubmit}>
        <div className='search__wrapper'>
          <input
            className='search__input'
            type='text'
            id='search'
            name='search'
            placeholder='Фильм'
            autoComplete='off'
            required
            defaultValue={searchText}
            onChange={handleChange}
          />
          <button
            className={
              isValidity
                ? "search__button"
                : "search__button search__button_disabled"
            }
            type='submit'
            disabled={!isValidity}
          >
            Поиск
          </button>
          <span></span>
        </div>
        <FilterCheckbox isChecked={isChecked} setIsChecked={setIsChecked} />
      </form>
    </section>
  );
}
