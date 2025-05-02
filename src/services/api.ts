import axios from 'axios'
const apiUrl = (import.meta as any).env.VITE_API_URL;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api