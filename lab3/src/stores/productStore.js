import { defineStore } from "pinia";
import { ref } from "vue";
import { useApi } from "@/composables/useApi";

export const useProductStore = defineStore("products", () => {
  const api = useApi("http://localhost:3000/products");

  const products = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;
    await api.getAll();
    if (api.error.value) {
      error.value = api.error.value;
    } else {
      products.value = api.data.value || [];
    }
    loading.value = false;
  };

  const getProductById = (id) => {
    return products.value.find((p) => p.id === id);
  };

  const decreaseStock = async (productId) => {
    const product = getProductById(productId);
    if (product && product.stock > 0) {
      product.stock--;
      await api.update(productId, product);
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductById,
    decreaseStock,
  };
});
