import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (email, password, role) => API.post('/auth/register', { email, password, role }),
  loginUser: (email, password) => API.post('/auth/login/user', { email, password }),
  loginAdmin: (email, password) => API.post('/auth/login/admin', { email, password }),
};

export const sweetsAPI = {
  getAllSweets: () => API.get('/sweets'),
  searchSweets: (filters) => API.get('/sweets/search', { params: filters }),
  createSweet: (data) => API.post('/sweets', data),
  updateSweet: (id, data) => API.put(`/sweets/${id}`, data),
  deleteSweet: (id) => API.delete(`/sweets/${id}`),
  purchaseSweet: (id, quantity) => API.post(`/sweets/${id}/purchase`, { quantity }),
  restockSweet: (id, quantity) => API.post(`/sweets/${id}/restock`, { quantity }),
};

export const cartAPI = {
  getCart: () => API.get('/cart'),
  addToCart: (sweetId, quantity) => API.post('/cart/add', { sweetId, quantity }),
  updateCartItem: (sweetId, quantity) => API.put('/cart/update', { sweetId, quantity }),
  removeFromCart: (sweetId) => API.post('/cart/remove', { sweetId }),
  clearCart: () => API.post('/cart/clear'),
};

export const orderAPI = {
  createOrder: (deliveryAddress, notes, discountCode) => API.post('/orders', { deliveryAddress, notes, discountCode }),
  getOrders: () => API.get('/orders'),
  getOrderById: (id) => API.get(`/orders/${id}`),
  getAllOrders: () => API.get('/orders/admin/all'),
  updateOrderStatus: (id, status) => API.put(`/orders/${id}/status`, { status }),
  cancelOrder: (id) => API.put(`/orders/${id}/cancel`),
};

export const adminAPI = {
  // Dashboard
  getDashboardStats: () => API.get('/admin/stats'),
  
  // Discounts
  createDiscount: (data) => API.post('/admin/discounts', data),
  getAllDiscounts: () => API.get('/admin/discounts'),
  updateDiscount: (id, data) => API.put(`/admin/discounts/${id}`, data),
  deleteDiscount: (id) => API.delete(`/admin/discounts/${id}`),
  validateDiscount: (code, orderAmount) => API.post('/admin/discounts/validate', { code, orderAmount }),
  
  // Banners
  createBanner: (data) => API.post('/admin/banners', data),
  getAllBanners: () => API.get('/admin/banners'),
  updateBanner: (id, data) => API.put(`/admin/banners/${id}`, data),
  deleteBanner: (id) => API.delete(`/admin/banners/${id}`),
  
  // Users
  getAllUsers: () => API.get('/admin/users'),
  updateUserRole: (id, role) => API.put(`/admin/users/${id}/role`, { role }),
  deleteUser: (id) => API.delete(`/admin/users/${id}`),
};

export const publicAPI = {
  getActiveBanners: () => API.get('/public/banners'),
};

export default API;