import "./FilterCheckbox.css";

export default function FilterCheckbox({ isChecked, setIsChecked }) {
  return (
    <div className='checkbox'>
      <input
        className='checkbox__switch'
        type='checkbox'
        id='switch'
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <label className='checkbox__label' htmlFor='switch'>
        Toggle
      </label>
      <p className='checkbox__description'>Короткометражки</p>
    </div>
  );
}
