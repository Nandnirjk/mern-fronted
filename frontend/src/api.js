import axios from 'axios';

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV ? '/api' : 'https://mern-project-883z.onrender.com/api'),
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export default API;
