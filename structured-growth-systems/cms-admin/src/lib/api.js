import axios from 'axios'

const rawBase = import.meta.env.VITE_API_URL || '/api'
const BASE_URL = rawBase.endsWith('/') ? rawBase : `${rawBase}/`

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cms_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('cms_token')
      localStorage.removeItem('cms_admin')
      // window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export const fetcher = async (url) => {
  const res = await api.get(url)
  return res.data
}

export const authApi = {
  login: (data) => api.post('auth/login', data),
  me: () => api.get('auth/me'),
}

export const blogApi = {
  list: (params) => api.get('blogs', { params }),
  get: (id) => api.get('blogs/' + id),
  create: (formData) => api.post('blogs', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) => api.put('blogs/' + id, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete('blogs/' + id),
  imageUrl: (id) => BASE_URL + 'blogs/' + id + '/image',
}

export const inquiryApi = {
  list: (params) => api.get('inquiries', { params }),
  get: (id) => api.get('inquiries/' + id),
  stats: () => api.get('inquiries/stats'),
  updateStatus: (id, status) => api.patch('inquiries/' + id + '/status', { status }),
  delete: (id) => api.delete('inquiries/' + id),
}

export const employeeApi = {
  list: (params) => api.get('employees', { params }),
  get: (id) => api.get('employees/' + id),
  create: (formData) => api.post('employees', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) => api.put('employees/' + id, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateStatus: (id, status) => api.patch('employees/' + id + '/status', { status }),
  imageUrl: (id) => BASE_URL + 'employees/' + id + '/image',
  documentUrl: (id, docId) => BASE_URL + 'employees/' + id + '/documents/' + docId,
}
