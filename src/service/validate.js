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
export const ValidateBanner = (banner) => {
  const { name, detail, image } = banner;
  return ValidateData({ name, detail, image });
};
export const ValidateOrder = (order) => {
  const { userId,addressId,partsId, startTime,priceTotal } = order;
  return ValidateData({ userId,addressId,partsId, startTime,priceTotal });
};
export const ValidateAddress = (address) => {
  const { village,district,province,latitude,longitude,detail } = address;
  return ValidateData({ village,district,province,latitude,longitude,detail });
};
export const ValidateParts = (parts) => {
  const { vehicleId,name, detail,amount,price, image } = parts;
  return ValidateData({ vehicleId,name,amount,price, detail, image });
};
export const ValidateVehicle = (vehicle) => {
  const { vehicleType, name, image } = vehicle;
  return ValidateData({ vehicleType, name, image });
};
export const ValidateProduct = (product) => {
  const { category_id, name,detail,price,amount } = product;
  return ValidateData({ category_id, name,detail,price,amount});
};
export const ValidateUser = (user) => {
  const { firstName, lastName, profile } = user;
  return ValidateData({ firstName, lastName, profile });
};
export const ValidateRefreshToken = (user) => {
  const { refreshToken } = user;
  return ValidateData({  refreshToken });
};
