import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'http://localhost:3000';


export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  currentProduct: null,


  fetchProducts: async () => {
    set({ loading: true })
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({ products: response.data.data, error: null });

    } catch (error) {
      set({ error: error.message, products: [] });
    } finally {
      set({ loading: false })
    }
  },
  formData: {
    title: '',
    description: '',
    price: '',
    image: ''
  },

  setFormData: formData => set({ formData }),
  resetFormData: () => set({ formData: { title: '', description: '', price: '', image: '' } }),

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      await get().fetchProducts();
      get().resetFormData();
      document.getElementById("add-product-modal").close();
      toast.success("Product added successfully");
    } catch (error) {
      toast.error("Failed to add product: " + error.message);
    } finally {
      set({ loading: false });
    }
  },


  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set(prev => ({ products: prev.products.filter(product => product.id !== id) }));
      toast.success("Product deleted successfully");
    }
    catch (error) {
      toast.error("Failed to delete product: " + error.message);
    }
    finally {
      set({ loading: false });
    }
  },

  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      const product = response.data.data;
      set({
        currentProduct: product, error: null, formData: product
      });
    } catch (error) {
      set({ error: error.message, currentProduct: null });
      toast.error("Failed to fetch product: " + error.message);
    } finally {
      set({ loading: false });
    }
  },
  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      const response = await axios.put(`${BASE_URL}/api/products/${id}`, formData);
      set({ currentProduct: response.data.data, error: null });
      toast.success("Product updated successfully");
    } catch (error) {
      set({ error: error.message });
      toast.error("Failed to update product: " + error.message);
    } finally {
      set({ loading: false });
    }
  }
}));