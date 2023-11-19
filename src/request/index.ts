'use strict';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 20000,
});
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
instance.interceptors.response.use(
  (result) => {
    return result.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default instance;
