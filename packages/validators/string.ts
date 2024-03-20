const UPPERCASE_REGEX = /[A-Z]/;
export const containsUppercase = (value: string) => {
  const isValid = value.match(UPPERCASE_REGEX);

  if (!isValid) {
    return "Must contain an uppercase letter";
  }
};

const LOWERCASE_REGEX = /[a-z]/;
export const containsLowercase = (value: string) => {
  const isValid = value.match(LOWERCASE_REGEX);

  if (!isValid) {
    return "Must contain a lowercase letter";
  }
};

const NUMBER_REGEX = /[0-9]/;
export const containsNumber = (value: string) => {
  const isValid = value.match(NUMBER_REGEX);

  if (!isValid) {
    return "Must contain a number";
  }
};

export const longerThan = (value: string, length: number) => {
  const isValid = value.length > length;

  if (!isValid) {
    return `Must be longer than ${length} characters`;
  }
};

export const shorterThan = (value: string, length: number) => {
  const isValid = value.length < length;

  if (!isValid) {
    return `Must be shorter than ${length} characters`;
  }
};
