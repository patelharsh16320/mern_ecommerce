import axios from 'axios';

const API_BASE = import.meta.env.VITE_BACKEND_API;

export const fetchProducts = () => axios.get(`${API_BASE}/show-product`);
export const deleteProduct = (id) => axios.delete(`${API_BASE}/product-delete/${id}`);
export const deleteCategory = async (id) =>  await axios.delete(`${API_BASE}/category-delete/${id}`);

export const fetchCategory = () => axios.get(`${API_BASE}/show-product_category`);
/**
 * Create a new product
 * @param {Object} product
 * @returns {Promise}
 */
export const createProduct = (product) =>
  axios.post(`${API_BASE}/product-create`, product);

export const createCategory = (category) =>
  axios.post(`${API_BASE}/create-product-category`, category);
