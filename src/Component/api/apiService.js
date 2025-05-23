import api from './axiosInstance';
import ENDPOINTS from './endpoints';

export const loginUser = (credentials) => {
  return api.post(ENDPOINTS.login, credentials);
};

export const registerUser = (data) => {
  return api.post(ENDPOINTS.register, data);
};

export const getUserProfile = () => {
  return api.get(ENDPOINTS.userProfile);
};

export const therapists_list = () => {
  return api.get(ENDPOINTS.therapists_list);
};
