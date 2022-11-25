import "./SearchForm.css";
import { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import useFormValidation from "../../utils/useFormValidation";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SearchForm({
  searchText,
  setSearchText,
  handleSubmit,
  isChecked,
  setIsChecked,
}) {
  const { pathname } = useLocation();
  const { values, handleChange } = useFormValidation();

  const [alert, setAlert] = useState("");

  function handleMiddlesubmit(e) {
    e.preventDefault();
    if (!values.search) {
      setAlert("Нужно ввести ключевое слово");
    } else {
      setAlert("");
      handleSubmit(e);
    }
  }

  useEffect(() => {
    if (pathname === "/movies" && localStorage.getItem("query")) {
      setSearchText(JSON.parse(localStorage.getItem("query"))?.req);
    }
    return;
  }, []);

  useEffect(() => {
    values.search && setSearchText(values.search);
  }, [values]);

  return (
    <section className='search'>
      <form
        className='form search__form'
        onSubmit={(e) => handleMiddlesubmit(e)}
      >
        <div className='search__wrapper'>
          <input
            className='search__input'
            type='text'
            id='search'
            name='search'
            placeholder='Фильм'
            autoComplete='off'
            defaultValue={searchText}
            onChange={(e) => handleChange(e)}
          />
          <button className={"search__button"} type='submit'>
            Поиск
          </button>
        </div>
        <p className='search__error'>{alert}</p>
        <FilterCheckbox isChecked={isChecked} setIsChecked={setIsChecked} />
      </form>
    </section>
  );
}
