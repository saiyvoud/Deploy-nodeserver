export const ValidateData = (data) => {
  return Object.keys(data).filter((key) => !data[key]);
};
export const ValidateLogin = (user) => {
  const { phoneNumber, password } = user;

  return ValidateData({ phoneNumber, password });
};
export const ValidateRegister = (user) => {
  const { firstName, lastName, phoneNumber, password } = user;

  return ValidateData({ firstName, lastName, phoneNumber, password });
};
export const ValidateUser = (user) => {
  const { firstName, lastName, profile } = user;
  return ValidateData({ firstName, lastName, profile });
};