import {
  containsLowercase,
  containsNumber,
  containsUppercase,
  longerThan,
} from "./string";

const MIN_PASSWORD_LENGTH = 10;

export const isPasswordInvalid = (value: string) => {
  const errors = [
    longerThan(value, MIN_PASSWORD_LENGTH),
    containsLowercase(value),
    containsUppercase(value),
    containsNumber(value),
  ];

  const isValid = errors.every((error) => !error);

  if (!isValid) {
    return errors.reduce((total: string, error) => {
      if (error) {
        return `${total}${total.length > 0 ? "\n" : ""}• ${error}`;
      }

      return total;
    }, "");
  }
};
