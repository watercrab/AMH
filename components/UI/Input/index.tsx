import React from "react";
import { Field } from "react-final-form";

import clsx from "clsx";

import { IInputProps } from "./types";

const Input = ({
  name,
  component,
  value,
  onChange,
  placeholder,
  type,
  required,
  children,
}: IInputProps) => {
  return (
    <div className={clsx([`field-box`])}>
      <label>{children}</label>
      <Field name={name} component={component}>
        {({ input }) => (
          <input
            {...input}
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            required={required}
            className={clsx([`field`, `field-text-white`])}
          />
        )}
      </Field>
    </div>
  );
};

export default Input;
