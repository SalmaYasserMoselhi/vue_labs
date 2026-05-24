<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import ProductDetails from "@/components/ProductDetails.vue";
import ProductCard from "@/components/ProductCard.vue";

const props = defineProps({
  productId: {
    type: Number,
    required: true,
  },
  products: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["buy"]);

const featuredProduct = ref(null);
const relatedProducts = ref([]);

const getPageData = () => {
  featuredProduct.value = props.products.find((p) => p.id === props.productId);
  relatedProducts.value = props.products.filter((p) => p.id !== props.productId);
};

onMounted(() => {
  getPageData();
  console.log("ProductView mounted for ID: " + props.productId);
});

onUnmounted(() => {
  console.log("ProductView unmounted");
});

watch(() => props.productId, getPageData, { immediate: false });

const handleBuy = (productId) => {
  emit("buy", productId);
};
</script>

<template>
  <div v-if="featuredProduct" class="space-y-10">
    <ProductDetails :product="featuredProduct" @buy="handleBuy" />

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
