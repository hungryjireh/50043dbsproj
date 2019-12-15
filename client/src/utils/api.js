import axios from 'axios';
import config from './config';

const { api: { uri } } = config;

const api = axios.create({
  baseURL: uri,
  timeout: 5000
});

export default api;
