export const isRequiredInvalid = (value: any) => {
  const isValid = ![null, undefined, ""].includes(value);

  if (!isValid) {
    return "You've got to put something here.";
  }
};
