import { useState, useCallback } from "react";

export default function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  const forceValidationChange = useCallback(
    (newIsValid = false) => {
      setIsValid(newIsValid);
    },
    [setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    setIsValid,
    resetForm,
    setValues,
    forceValidationChange,
  };
}
