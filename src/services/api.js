const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Token helpers using localStorage
const TOKEN_KEY = 'portfolio_token';

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Generic request helper
async function request(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

// Auth API
export const register = (name, email, password) =>
  request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password })
  });

export const login = (email, password) =>
  request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

export const getMe = () => request('/api/auth/me');

// Task API
export const getTasks = () => request('/api/tasks');

export const getTaskById = (id) => request(`/api/tasks/${id}`);

export const createTask = (data) =>
  request('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(data)
  });

export const updateTask = (id, data) =>
  request(`/api/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });

export const deleteTask = (id) =>
  request(`/api/tasks/${id}`, {
    method: 'DELETE'
  });

export const getTaskStats = () => request('/api/tasks/stats');

// Practical 13: AI Description Generation
export const generateAIDescription = (title) =>
  request('/api/ai/generate-description', {
    method: 'POST',
    body: JSON.stringify({ title })
  });
