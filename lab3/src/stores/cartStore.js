import { defineStore } from "pinia";
import { computed } from "vue";
import { useLocalStorage } from "@/composables/useLocalStorage";
import { useProductStore } from "@/stores/productStore";

export const useCartStore = defineStore("cart", () => {
  const items = useLocalStorage("cart", []);

  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.qty, 0);
  });

  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price * item.qty, 0);
  });

  const addToCart = (product) => {
    const existing = items.value.find((item) => item.id === product.id);
    if (existing) {
      existing.qty++;
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1,
      });
    }
    const productStore = useProductStore();
    productStore.decreaseStock(product.id);
  };

  const removeFromCart = (id) => {
    const index = items.value.findIndex((item) => item.id === id);
    if (index !== -1) {
      items.value.splice(index, 1);
    }
  };

  const clearCart = () => {
    items.value = [];
  };

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    clearCart,
  };
});
