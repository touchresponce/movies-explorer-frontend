import "./Input.css";

export default function Input({ name, label, type, error }) {
  return (
    <>
      <div className={`input input_type_${type}`}>
        <label className="input__label" htmlFor={name}>
          {label}
        </label>
        <input
          className={`input__wrapper ${name}__input ${name}__input_type_${type}`}
          id="email-input"
          name={name}
        />
      </div>
      {/* <span
        className={`${name}__input-error ${type}-input-error ${
          !isValid ? `${type}__input-error_active` : ""
        }`}
      >
        {error}
      </span> */}
    </>
  );
}
