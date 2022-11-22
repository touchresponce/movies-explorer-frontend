import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

export default function SearchForm({
  searchText,
  setSearchText,
  handleSubmit,
  isChecked,
  setIsChecked,
}) {
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
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className='search__button' type='submit'>
            Поиск
          </button>
          <span></span>
        </div>
        <FilterCheckbox isChecked={isChecked} setIsChecked={setIsChecked} />
      </form>
    </section>
  );
}
