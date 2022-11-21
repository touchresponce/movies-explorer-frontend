import "./FilterCheckbox.css";

export default function FilterCheckbox({ setIsChecked }) {
  return (
    <div className='checkbox'>
      <input className='checkbox__switch' type='checkbox' id='switch' />
      <label className='checkbox__label' htmlFor='switch'>
        Toggle
      </label>
      <p className='checkbox__description'>Короткометражки</p>
    </div>
  );
}
