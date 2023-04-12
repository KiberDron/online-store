import { $authHost, $host } from "./index";

export const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post("api/brand", brand);
  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};

export const createDevice = async (device) => {
  const { data } = await $authHost.post("api/device", device);
  return data;
};

export const fetchDevices = async (
  typeId,
  brandId,
  page,
  limit,
  orderCol = "name",
  orderType = "ASC"
) => {
  const { data } = await $host.get("api/device", {
    params: {
      typeId,
      brandId,
      page,
      limit,
      orderCol,
      orderType,
    },
  });
  return data;
};

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get("api/device/" + id);
  return data;
};

export const createRate = async (rate) => {
  const { data } = await $authHost.post("api/rating", rate);
  return data;
};

export const updateRate = async (rate) => {
  const { data } = await $authHost.put("api/rating", rate);
  return data;
};

export const fetchUserRating = async (userId, deviceId) => {
  const { data } = await $authHost.get("api/rating/user_rating/" + deviceId, {
    params: {
      userId,
    },
  });
  return data;
};

export const fetchRating = async (deviceId) => {
  const { data } = await $host.get("api/rating/" + deviceId);
  return data;
};

export const updateDeviceRating = async (rating) => {
  const { data } = await $authHost.put("api/device", rating);
  return data;
};

export const createBasketDevice = async (bodyData) => {
  const { data } = await $authHost.post("api/basket", bodyData);
  return data;
};

export const fetchBasket = async (userId) => {
  const { data } = await $authHost.get("api/basket/" + userId);
  return data;
};

export const deleteBasketDevice = async (deviceId, userId) => {
  const { data } = await $authHost.delete("api/basket", {
    params: {
      deviceId,
      userId,
    },
  });
  return data;
};
