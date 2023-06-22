import axios from "axios";

import config from "../config";
import TokenService from "./tokenService";

// const refreshToken = async () => {
//   try {
//     const instance = axios.create({
//       withCredentials: true,
//       baseURL: `${config.SERVER_URL}`,
//     });
//     const res = await instance.post("/auth/refresh");
//     return res.data;
//   } catch (err) {
//     console.log(err);
//   }
// };

export const createAxiosJWT = () => {
  const newInstance = axios.create({
    withCredentials: true,
    baseURL: `${config.SERVER_URL}`,
  });
  newInstance.interceptors.request.use(
    async (config) => {
      const token = await TokenService.getAuthToken();
      config.headers["x-access-token"] = `Bearer ${token}`;
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};

export const createAxios = () => {
  const instance = axios.create({
    withCredentials: true,
    baseURL: `${config.SERVER_URL}`,
  });
  return instance;
};

export const createAxiosDefault = () => {
  const instance = axios.create({
    baseURL: `${config.SERVER_URL}`,
  });
  return instance;
};
