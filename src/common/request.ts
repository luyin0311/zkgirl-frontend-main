import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

axios.defaults.withCredentials = false;
axios.defaults.baseURL = import.meta.env.MODE === 'development' ? '/api/' : import.meta.env.REACT_APP_BASE_URL;
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function checkStatus(response: AxiosResponse): AxiosResponse {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  throw error;
}

export async function request(reqUrl: string, options: AxiosRequestConfig = { method: 'GET' }): Promise<AxiosResponse> {
  const response = await axios(reqUrl, options)
    .then(checkStatus)
    .catch(err => {
      throw err;
    });
  return response;
}
