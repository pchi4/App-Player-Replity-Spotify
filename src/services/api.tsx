import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CLIENT_SECRET, CLIENT_ID } from "react-native-dotenv";

const apiInstance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  baseURL: "https://api.spotify.com/v1",
  withCredentials: true,
});

const getRefreshToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    const response = await axios("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }).toString(),
    });

    return response.data.access_token;
  } catch (error) {}
};

apiInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      originalRequest._retry = true;

      const resp = await getRefreshToken();

      const access_token = resp;

      await AsyncStorage.setItem("token", access_token);
      apiInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${access_token}`;
      return apiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
