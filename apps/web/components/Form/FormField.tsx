import { useFormContext, Controller } from "react-hook-form";

import styles from "./Form.module.css";

import type { FormFieldProps } from "./types";

export const FormField = ({
  name,
  validate,
  onChange,
  helper,
  error,
  dependsOn,
  label,
  component: Component,
  unregisterOnUnmount = true,
  ...restProps
}: FormFieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ validate, deps: dependsOn }}
      shouldUnregister={unregisterOnUnmount}
      render={({
        field: { onChange: onFieldChange, onBlur, value },
        fieldState: { error },
      }) => {
        const onComponentChange = (newValue: any) => {
          onFieldChange(newValue);

          if (onChange) {
            onChange(newValue);
          }
        };

        return (
          <div className={styles.container}>
            <p className={styles.label}>{label}</p>

            <Component
              onChange={onComponentChange}
              onBlur={onBlur}
              value={value}
              isError={!!error}
              {...restProps}
            />

            <div className={styles.underContainer}>
              {error ? (
                <p className={styles.errorText}>{error.message}</p>
              ) : helper ? (
                <p className={styles.helperText}>{helper}</p>
              ) : null}
            </div>
          </div>
        );
      }}
    />
  );
};
