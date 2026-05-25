<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from "@/stores/productStore";
import ProductDetails from "@/components/ProductDetails.vue";
import ProductCard from "@/components/ProductCard.vue";

const props = defineProps({
  productId: {
    type: Number,
    required: true,
  },
});

const productStore = useProductStore();
const { products, loading, error } = storeToRefs(productStore);

const featuredProduct = ref(null);
const relatedProducts = ref([]);

const getPageData = async () => {
  if (!products.value || products.value.length === 0) {
    await productStore.fetchProducts();
  }
  featuredProduct.value = productStore.getProductById(props.productId);
  relatedProducts.value = products.value.filter((p) => p.id !== props.productId);
};

onMounted(() => {
  getPageData();
});

watch(() => props.productId, getPageData, { immediate: false });
</script>

<template>
  <div v-if="loading" class="flex justify-center py-12">
    <span class="loading loading-spinner loading-lg"></span>
  </div>

  <div v-else-if="error" class="alert alert-error">
    <span>Failed to load product. Make sure json-server is running.</span>
  </div>

  <div v-else-if="featuredProduct" class="space-y-10">
    <ProductDetails :product="featuredProduct" />

    <div>
      <h2 class="text-xl font-bold mb-6">Related Products</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductCard
          v-for="item in relatedProducts"
          :key="item.id"
          :product="item"
        />
      </div>
    </div>
  </div>

  <div v-else class="text-center py-20">
    <h2 class="text-2xl font-bold">Product not found</h2>
  </div>
</template>
