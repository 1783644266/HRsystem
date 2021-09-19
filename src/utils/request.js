import axios from 'axios';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 3000
})

service.interceptors.request.use()
service.interceptors.response.use()

export default service;


