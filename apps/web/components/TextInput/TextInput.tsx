"use client";

import styles from "./TextInput.module.css";

import type { TextInputProps } from "./types";

export const TextInput = ({
  value,
  onChange,
  isError,
  isDisabled,
  type = "text",
  onBlur,
  transform,
}: TextInputProps) => {
  const onhandleChange = ({
    target: { value: newValue },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = transform ? transform(newValue) : newValue;
    onChange(formattedValue);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={onhandleChange}
      onBlur={onBlur}
      className={`${styles.container} ${isError ? styles.error : ""}`}
      disabled={isDisabled}
    />
  );
};
