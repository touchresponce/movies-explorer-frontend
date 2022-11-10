import "./Input.css";

export default function Input({
  name,
  label,
  type,
  placeholder,
  defValue,
  isValid,
}) {
  return (
    <>
      <div className={`input input_type_${type}`}>
        <label className="input__label" htmlFor={name}>
          {label}
        </label>
        <input
          className={`input__wrapper ${
            !isValid ? "input__wrapper_color" : ""
          } ${name}__input ${name}__input_type_${type}`}
          id={`${name}-input`}
          type={type}
          name={name}
          placeholder={placeholder}
          defaultValue={defValue}
        />
      </div>
      <span className={`input__error ${!isValid ? `input__error_active` : ""}`}>
        Что-то пошло не так...
      </span>
    </>
  );
}
