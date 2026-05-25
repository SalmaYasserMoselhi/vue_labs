<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from "@/stores/productStore";
import CarouselBanner from "@/components/CarouselBanner.vue";
import ProductCard from "@/components/ProductCard.vue";

const productStore = useProductStore();
const { products, loading, error } = storeToRefs(productStore);

onMounted(() => {
  productStore.fetchProducts();
});
</script>

<template>
  <div class="space-y-8">
    <CarouselBanner />

    <h2 class="text-2xl font-bold">Our Products</h2>

    <div v-if="loading" class="flex justify-center py-12">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <div v-else-if="error" class="alert alert-error">
      <span>Failed to load products. Make sure json-server is running.</span>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
