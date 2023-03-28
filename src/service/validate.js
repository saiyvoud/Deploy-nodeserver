export const ValidateData = (data) => {
  return Object.keys(data).filter((key) => !data[key]);
};

export const ValidateRegister = (user) => {
  const { firstName, lastName, phoneNumber, password } = user;

  return ValidateData({ firstName, lastName, phoneNumber, password });
};
