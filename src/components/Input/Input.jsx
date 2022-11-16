import "./Input.css";

export default function Input({
  name,
  label,
  type,
  placeholder,
  minLength,
  isValid,
  errors,
  onChange,
}) {
  return (
    <>
      <div className={`input input_type_${type}`}>
        <label className="input__label" htmlFor={name}>
          {label}
        </label>
        <input
          className={`input__wrapper ${
            errors ? "input__wrapper_color" : ""
          } ${name}__input ${name}__input_type_${type}`}
          id={`${name}-input`}
          autoComplete="off"
          required
          type={type}
          name={name}
          placeholder={placeholder}
          minLength={minLength}
          onChange={onChange}
        />
      </div>
      <span className={`input__error ${!isValid ? `input__error_active` : ""}`}>
        {errors}
      </span>
    </>
  );
}
