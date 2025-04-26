
// import axios from 'axios';
// import { environment } from '../environment'; 

// const Interceptor = axios.create({
//   baseURL: `${environment.serverUrl}${environment.userApi}`,
//   headers: { 'Content-Type': 'application/json' },
// });

// // 👉 Request Interceptor: add token
// Interceptor.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token'); // or sessionStorage
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Interceptor.interceptors.response.use(
//   (response) => response.data ? response.data : response,
//   (error) => {
//     if (error.response) {
//       console.error('API Error:', error.response.data.message);
//       // Optionally redirect to login or show toast
//     } else {
//       console.error('Network Error:', error.message);
//     }
//     return Promise.reject(error);
//   }
// );

// export default Interceptor;




import axios from 'axios';
import { environment } from '../environment';

const Interceptor = axios.create({
  baseURL: `${environment.serverUrl}${environment.userApi}`,
  headers: { 'Content-Type': 'application/json' },
});

// 👉 Request Interceptor: add token
Interceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 👉 Response Interceptor: handle expired token
Interceptor.interceptors.response.use(
  (response) => (response.data ? response.data : response),
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // Redirect if token is expired or unauthorized
      if (status === 401 || status === 403) {
        console.warn('Session expired. Redirecting to login...');
        localStorage.removeItem('token'); 
        window.location.href = '/login'; 
      }

      console.error('API Error:', error.response.data?.message || error.message);
    } else {
      console.error('Network Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default Interceptor;
